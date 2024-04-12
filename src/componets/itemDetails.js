import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Modal, View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { heavyComputation } from '../functions/heavyComputation';
import fetchData from '../hooks/getData';

const ItemDetailsModal = ({ isVisible, onClose, itemId }) => {
  const [itemData, setItemData] = useState(null);
  const [computedDetails, setComputedDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataAndComputeDetails = useCallback(async () => {
    try {
      const responseData = await fetchData({ url: `posts/${itemId}` });
      setItemData(responseData);
      const computed = heavyComputation(responseData);
      setComputedDetails(computed);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  }, [itemId]);

  useEffect(() => {
    if (isVisible && itemId) {
      fetchDataAndComputeDetails();
    }

    // Cleanup function to clear data when component unmounts or modal closes
    return () => {
      setItemData(null);
      setComputedDetails(null);
      setLoading(true);
      setError(null);
    };
  }, [isVisible, itemId, fetchDataAndComputeDetails]);

  const modalContent = useMemo(() => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Text style={styles.id}>ID: {itemData.id}</Text>
            <Text style={styles.title}>{itemData.title}</Text>
            <Text style={styles.body}>{itemData.body}</Text>
          </View>
          <Button title="Back" onPress={onClose} />
        </View>
      );
    }
  }, [loading, error, itemData, computedDetails, onClose]);

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      {modalContent}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
   cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 4, // iOS shadow
  },
  content: {
    padding: 16,
  },
  id: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Changed color to improve readability
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#666', // Changed color to improve readability
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemDetailsModal;

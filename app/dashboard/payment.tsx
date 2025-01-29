import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
// Changed to Expo icons
import { Feather } from '@expo/vector-icons';
import { baseUrl } from '@/consts/urls';

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);
  const { confirmPayment } = useStripe();
  const [cardholderName, setCardholderName] = useState('');

  const handlePayPress = async () => {
    setLoading(true);
    try {
      const clientSecret = await fetchPaymentIntentClientSecret();
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType:"Card"
      });

      if (error) {
        console.log('Payment confirmation error', error);
      } else if (paymentIntent) {
        console.log('Payment successful', paymentIntent);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(baseUrl+'/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1099,
        currency: 'usd',
      }),
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Feather name="credit-card" size={24} color="#2563eb" />
                <Text style={styles.title}>Payment Details</Text>
              </View>
              <Text style={styles.subtitle}>
                Enter your card information to complete the purchase
              </Text>
            </View>

            {/* Form Content */}
            <View style={styles.formContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cardholder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Smith"
                  placeholderTextColor="#9ca3af"
                  value={cardholderName}
                  onChangeText={setCardholderName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Card Information</Text>
                <CardField 
                  placeholders={{
                    number: '4242 4242 4242 4242',
                    cvc:"123"
                  }}
                  cardStyle={styles.cardField}
                  style={styles.cardFieldContainer}
                />
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.payButton, loading && styles.payButtonDisabled]}
                onPress={() => {
                    handlePayPress()
                }}
                disabled={loading}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#ffffff" />
                    <Text style={styles.buttonText}>Processing...</Text>
                  </View>
                ) : (
                  <View style={styles.buttonContent}>
                    <Feather name="lock" size={20} color="#ffffff" />
                    <Text style={styles.buttonText}>Pay $10.99</Text>
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.securityNote}>
                <Feather name="lock" size={14} color="#6b7280" />
                <Text style={styles.securityText}>
                  Your payment information is secure and encrypted
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  formContent: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    height: 44,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111827',
  },
  cardField: {
    backgroundColor: '#ffffff',
    color:"black",  
  },
  cardFieldContainer: {
    height: 44,
    marginTop: 8,
    color:"black",
  },
  footer: {
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  payButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
});

export default PaymentScreen;
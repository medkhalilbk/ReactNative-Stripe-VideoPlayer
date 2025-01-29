## 🚀 ReactNative-Stripe-VideoPlayer  

A **Proof of Concept (POC) / Minimum Viable Product (MVP)** for integrating **Stripe payments** with a **React Native video player**. This project demonstrates a paywall system where users must complete a **secure Stripe payment** before accessing video content.  

### 🎯 Features  
✅ **Stripe Payments** – Accept payments via **credit cards, Apple Pay, Google Pay**  
✅ **React Native Video Player** – Play videos smoothly using `react-native-video`  
✅ **Paywall System** – Unlock video content after successful payment  
✅ **Secure Transactions** – Uses Stripe’s latest API for handling payments safely  

### 📌 Use Cases  
- **Pay-per-view streaming** (e.g., exclusive video content)  
- **Subscription-based video access**  
- **E-learning platforms**  
- **NFT or token-gated video content**  

---

## 🛠 Tech Stack  
- **React Native**  
- **Stripe API** (`@stripe/stripe-react-native`)  
- **React Native Video** (`react-native-video`)  
- **Node.js / Supabase (for backend payment processing - optional)**  

---

## 🚀 Getting Started  

### 1⃣ Install Dependencies  
```sh
npm install
# OR
yarn install
```

### 2⃣ Setup Stripe  
Create a **Stripe account** at [Stripe Dashboard](https://dashboard.stripe.com/) and get your **API keys**.  

### 3⃣ Prebuild using Expo
```sh
npx expo prebuild
```

### 4⃣ Run the App  
For **iOS** (use Mac with Xcode):  
```sh
cd ios && pod install && cd ..
npx expo start
```
For **Android**:  
```sh
npx expo run:android
``` 
 For **IOS**:  
```sh
npx expo run:ios
``` 

---

## 🤝 Open for Collaboration!  
This is an **open-source experiment**, and I’d love to get **feedback & contributions**! Looking for:  
🔹 **React Native developers**  
🔹 **Backend engineers** (Node.js, Firebase, Stripe API)  
🔹 **UI/UX designers**  

**Drop a PR or connect if you're interested! 🚀**  

---

## 🐟 License  
This project is open-source and available under the **MIT License**.


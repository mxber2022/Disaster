# **Emergency** 🌐🚨

_A Decentralized Real-Time Communication Tool for Natural Disasters in Southeast Asia_

## **Overview**

During natural disasters like typhoons and floods in Southeast Asia, communication and coordination are critical for saving lives. **Emergency** is a real-time communication platform built with **Next.js** for the frontend and **Express.js** for the backend, designed to help people in disaster zones stay connected.

The platform integrates a map-based interface for pinning locations, instant messaging via Push Protocol, video updates for visual confirmation of urgent needs, and additional features like user posts and donations to support rescue efforts.

## **Key Features**

### ** SEDA Oracle **

To verfiy the live status weather.

tx │ 'CE41E83F4B88D0C3679F298FC106CB1F1BBE6A51A1808A57532414DCC57B8D8D' │
oracleProgramId │ '40d0e4c86523f7bc378a8f5a0f18e148248dd1068b48e9f21d7d539afb0f1e8e'

https://devnet.explorer.seda.xyz/data-requests/bd303dd78a29a5d144daf1c71e122519194b324662b16d72b96daa72bbd31329

### 🗺️ **Location Pinning (Powered by Express.js Backend)**

Users can pin their **precise location** on an interactive map in case of an emergency. The pinned location data is stored in a **Node.js** and **Express.js** backend, allowing rescuers and volunteers to quickly access and locate people in need.

- **Quick Pin:** Drop a pin with your address or location to alert others of your position.
- **Secure Storage:** All location data is securely stored and accessible by those involved in rescue efforts.

### 💬 **Real-Time Communication (Push Protocol)**

Powered by **Push Protocol**, Emergency allows users to chat instantly with others on the platform, providing a **reliable communication channel** when traditional networks fail.

- **Decentralized Chat:** Stay connected with others through a decentralized chat system.
- **Group and Private Messaging:** Chat with groups or one-on-one to coordinate rescue efforts or share important updates.

### 📹 **Video Updates**

In urgent situations, users can send **short video messages** to provide visual confirmation of their situation. This feature helps rescuers better understand the environment and plan more effective rescues.

- **Visual Communication:** Show your situation and surroundings, helping others see the level of urgency.
- **Broadcast:** Authorities or rescue teams can send video broadcasts to update people on weather conditions, road closures, or nearby shelters.

### ✍️ **User Posts**

Users can create **public posts** to share important information, such as available resources, local shelter updates, or volunteer opportunities. These posts are viewable by others on the platform, allowing for **community-driven collaboration** during disasters.

- **Resource Sharing:** Post about available food, water, medical supplies, and other essential resources.
- **Local Updates:** Provide local updates on shelter locations, road conditions, and more to aid coordination.

### 💰 **Donations**

Emergency includes a **donation feature** that allows users to send or receive **cryptocurrency donations** to support those in need or fund rescue efforts. Users can donate directly to specific individuals or to the platform’s emergency relief fund.

- **Crypto Donations:** Make donations using cryptocurrencies to support rescue operations or provide financial aid to those in need.
- **Direct Support:** Users in disaster zones can receive donations to purchase critical supplies or cover other urgent needs.

## **Why Emergency?**

In regions prone to natural disasters, **communication is critical** for survival. Emergency provides a **decentralized, real-time communication platform** that remains operational when traditional systems go down, with **Next.js** ensuring a seamless user interface and **Express.js** managing backend storage for critical location data, posts, and donations.

- **Disaster-Proof Communication:** Whether you're in an urban center or a remote village, Emergency connects you to others in times of need.
- **Life-Saving Coordination:** By visualizing where help is needed and enabling instant communication, we aim to reduce rescue response times and save lives.
- **Financial Aid During Crises:** Provide and receive financial support through a secure and transparent donation system.

## **Tech Stack**

- **Frontend:** Next.js
- **Backend:** Express.js (for storing and retrieving pinned location data, posts, and managing donations)
- **Push Protocol:** For real-time, decentralized messaging
- **Database:** MySQL (or any other database solution to store pinned locations, posts, and donations)
- **Map Integration:** Google Maps API (or any other map service)
- **Blockchain:** Integration for crypto donations (e.g., Ethereum, Polygon)

## **How It Works**

1. **Pin Your Location:** Users can quickly drop a pin on the map to share their location.
2. **Backend Storage:** Location data, posts, and donation details are stored and managed by the Express.js server, allowing secure access to rescuers and volunteers.
3. **Real-Time Communication:** Users can chat with others via Push Protocol, sharing updates, requesting help, and coordinating rescue efforts.
4. **Post Updates:** Share posts about available resources, shelter locations, or other vital information.
5. **Make Donations:** Donate cryptocurrencies to those affected by the disaster or support ongoing rescue operations.

## **Our Vision**

For the millions of people affected by typhoons and floods in Southeast Asia, Emergency is more than just a tool—it’s a lifeline. By combining location sharing, decentralized chat, video updates, community posts, and donations, we aim to transform disaster response and rescue coordination across the region.

Whether it's reaching out for help, assisting others nearby, or providing financial support, **Emergency ensures that no one is truly alone during a crisis**.

---

### **How to Set Up the Project**

#### **Frontend (Next.js)**

1. Clone the repository:

   ```bash
   git clone https://github.com/mxber2022/Disaster
   cd Disaster
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Start the Next.js development server:
   ```bash
   yarn dev
   ```

#### **Backend (Express.js)**

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Start the Express server:
   ```bash
   npm run start
   ```

---

### **How to Contribute**

We welcome contributions from developers, disaster response experts, and anyone who wants to help improve this tool. Please check out our [Contribution Guidelines](CONTRIBUTING.md) to get started.

### **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### **Get Involved**

Emergency is in active development! Join us in building a tool that can **save lives during natural disasters**.

---

# Sleep2Earn Reward Algorithm

The **Sleep2Earn Reward Algorithm** is a fair and transparent system designed to reward users for achieving their sleep goals. It calculates rewards based on how closely users adhere to their sleep targets (bedtime/waketime, duration, and quality) and encourages consistency through streak bonuses.

---

## **How It Works**

The algorithm calculates rewards using the following steps:

### **1. Inputs**
The algorithm takes the following inputs:

#### **Set your Sleep Goals**
- `targetBedtime`: The user's target bedtime (e.g., `22:45`).
- `targetWakeUpTime`: The user's target wake-up time (e.g., `06:45`).
- `targetDuration`: The user's target sleep duration in hours (e.g., `8`).
- `targetQuality`: The user's target sleep quality (e.g., `85%`).

#### **Actual Sleep Data (10 points each)**
- `actualBedtime`: The user's actual bedtime (e.g., `23:00`).
- `actualWakeUpTime`: The user's actual wake-up time (e.g., `07:00`).
- `actualDuration`: The user's actual sleep duration in hours (e.g., `8`).
- `actualQuality`: The user's actual sleep quality (e.g., `80%`).

#### **Consistency Bonus**
- `streakDays`: The number of consecutive days the user has met their goals (`50 points`).

---

### **2. Calculate Total Point**
For each sleep metric, the algorithm calculates how closely the user adhered to their goal:

totalPoints = bedtimeScore + wakeUpScore + durationScore + qualityScore;

### **3. Calculate Total Token earned**

tokensTokensEarned = totalPoints

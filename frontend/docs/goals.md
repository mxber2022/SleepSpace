# Sleep Goals Meaning

This is not your regular goal which you set and forget. The Sleep Goals Algorithm is designed to help users improve their sleep habits by setting personalized, achievable goals. It takes into account the user's current sleep patterns, age, and lifestyle to create a tailored plan for better sleep. 

For SleepSpace : only Age is taken in account. Improvement will made in later versions.

---

## **Goals Types**

1. **No Loss Goal**: User stake is locked until mature date still earning stake rewards.
2. **Loss Mode**: User loss portion of there stake if goals not achieved.

## **Why This Algorithm?**

1. **Personalization**: Sleep needs vary based on age, lifestyle, and individual habits. A one-size-fits-all approach doesn't work.
2. **Gradual Improvement**: Small, incremental changes are more sustainable and less overwhelming than drastic shifts.
3. **Health-Focused**: The algorithm aligns with sleep health recommendations from organizations like the National Sleep Foundation.
4. **Motivation**: By setting realistic goals, users are more likely to stay motivated and see progress over time.

---

## **How It Works**

The algorithm uses the following inputs to calculate sleep goals:

### **Inputs**
1. **Current Sleep Data**:
   - `bedtime`: The user's current bedtime (e.g., `23:00`).
   - `wakeUpTime`: The user's current wake-up time (e.g., `07:00`).
   - `currentDuration`: Total sleep duration (e.g., `7`).
   - `currentQuality`: The user's sleep quality (e.g., `75%`). (Quality because see Sleep Quality documentation)
   - what time you sleep will matters (implementation)

2. **User Profile**:
   - `age`: The user's age (e.g., `28`).
   - `lifestyle`: The user's activity level (`sedentary`, `moderate`, or `active`).

---

### **Steps**

#### **1. Calculate Ideal Sleep Duration**
The algorithm determines the ideal sleep duration based on the user's age:
- **Adults (18-64 years)**: 7-9 hours (target: 7.5 hours).
- **Older Adults (65+ years)**: 7-8 hours (target: 7 hours).
- **Teens (14-17 years)**: 8-10 hours (target: 9 hours).

#### **2. Set Target Duration**

#### **3. Adjust Bedtime and Wake-up Time**

#### **4. Set Target Quality**

#### **5. Generate Improvement Plan**
Based on the user's lifestyle, the algorithm provides tailored advice:
- **Sedentary**: "Try light stretching or yoga before bed to improve sleep quality."
- **Moderate**: "Maintain a consistent sleep schedule and avoid screens 1 hour before bed."
- **Active**: "Ensure you wind down after physical activity and stay hydrated."

---

### **Example**

#### **Input**
#### **improvementPlan** (coming)
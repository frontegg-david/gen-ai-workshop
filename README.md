# 🤖 Using AI in your UI Workshop

Where a SaaS platform springs into action, instantly surfacing critical notifications and error logs as soon as it
senses a user logging in late at night. Or a web application where users can effortlessly type in commands using natural
language, and the system responds by executing intricate action sequences.

There's a secret weapon in our development arsenal that remains largely untapped when it comes to accelerating AI
integration: our end-to-end (e2e) tests.
These are the tests that mimic real user interactions, and they are bursting with valuable data about user behaviors,
application flows, and potential commands.

In this hands-on workshop, we'll dive deep into the exciting intersection of AI and e2e testing.
Together, we'll discover how to leverage our existing test suites to train AI models, setting the stage for user
interfaces that are not just smart, but also intuitive and adaptive.

# 🚀 Getting Started

## 1️⃣ Setup: Installing Dependencies

After cloning the repository to your local machine, it's time to set things up:

```bash
yarn install
```

This command also trigger a `postinstall` hook, than installing Chromium, for our e2e tests.

## 2️⃣ Launching the Portal Web Application

Execute the following command to start the portal:

```bash
yarn start:portal
```

In another terminal run the backend process as well.

```bash
 yarn start:backend
```

Once it's up, take a moment to navigate through and get a feel for the pages. It's your playground for the workshop!

## 3️⃣ Full e2e Testing in Headed Mode

To see the tests in action, use:

```bash
yarn e2e:ai
```

This runs the comprehensive end-to-end tests in headed mode, letting you witness each interaction live on screen!

## 4️⃣ Locating and Extracting Test Outputs

After running the e2e tests, you can find the test outputs in:

```bash
dist/.playwright/apps/portal-e2e/test-output/{test_name}/trace.zip
```

To dive into the details:

Navigate to the specified directory.
Extract the trace.zip file to view the test traces.

## 5️⃣ Diving Deeper into Test Traces

Inside the trace.zip you've just extracted, you'll find a .jsonl file named test.trace. This file provides a detailed
record of all actions performed by Playwright during the e2e test run.

**Want a visual insight? 📊**

Run the following command to view these actions using Playwright's report feature:

```bash
yarn e2e:report
```

This will generate a visual report, giving you a clearer understanding of each test step.

## 6️⃣ Preparing e2e Test Reports & Generating AI Prompts

Ready to understand the magic behind generating AI prompts from e2e test reports? Let's dive in!

**📍 Step-by-Step Guide**

1. **Navigate to the AI Model Project:**

   Head over to the apps/ai-model project directory.

2. **Open the Main Script:**

   Find and open the src/main.ts file. This is where all the action happens!

3. **Understanding the Key Functions:**

   Within src/main.ts, several critical functions come into play:

    - **Extracting Reports:**

         ```javascript
         let reports = await getE2EReports();
         ```
      This function unzips the report files and stores their content in a JSON array.

    - **Cleaning the Reports:**
         ```javascript
         const cleanedReports = reports.map(prepareReport);
         ```
      Here, unnecessary data such as userAgent details, internal Playwright logs, and more are filtered out.

    - **Generating Command Suggestions with GPT:**

         ```javascript
         const withSuggestions = await Promise.all(cleanedReports.map(generateSuggestions));
         ```
      This step leverages GPT to generate descriptive suggestions for the code.
      This is pivotal for enhancing context accuracy and scaling embeddings later on.

    - **Generate the Flow Prompts:**

        ```javascript
        const withFlowPrompts = await Promise.all(withSuggestions.map(generateFlowPrompts))
        ```
      These sub prompts will be used to construct the prompt template.

    - **Creating the Final Prompts:**

        ```javascript
        const prompts = await Promise.all(withPrompts.map(generateCodeDescription))
        ```
      These prompts are what the system will use to interpret and act upon natural language (NL) commands from users.

## 7️⃣ Generating AI Prompts & Reviewing Results

Ready to generate the actual AI prompts? Here's your action plan:

1. **Kick Off the Generation Process:**

   Execute the command to start generating the prompts:

   ```bash
   yarn generate:prompts
   ```

2. **Locate the Generated Results:**

   Once the command completes, you can find the generated prompts in:

   ```bash
   apps/backend/src/assets/prompts/command/flows.txt
   ```

3. **Understand the Significance:**

   The content of flows.txt isn't just any ordinary set of prompts. These are the refined results that get sent to
   OpenAI,
   serving as the foundation for task specializations.

# 🌐 Step 2: Exploring the Portal Overview

## 1️⃣ Navigate to the Portal Homepage

First things first, head over to the portal's homepage.

## 2️⃣ Understanding the Current Overview

As you'll see, the overview section is packed with stats. While it might look comprehensive,
there's a catch: the order is static and many of these stats might not be relevant to the specific user who's logged in.

This presents an opportunity: How can we make this more dynamic and user-centric? Keep this thought in mind as we
proceed.

## 3️⃣ Diving into the Portal Overview Page Code

Time to roll up our sleeves and inspect the code that powers the overview section!

1. **Navigate to the Code:**

   Open up the apps/portal/src/pages/OverviewPage directory.

2. **Inspecting the API Call:**

   Here, you'll discover an API call. This call fetches blocks of stats from our backend, which are then displayed on
   the overview page.

3. **Component Mapping in the Render Section:**

   Delving deeper into the render section, you'll come across the component mapper. This ingenious piece of code
   translates the raw stats (in JSON format) into visual components that users see on the portal.

By understanding this, you'll gain insights into how static stats are currently presented. But remember, our goal is to
make this dynamic and more user-relevant.

### 4️⃣ Optimizing Stats Based on User Context

Our next step is to make the backend deliver ordered stats tailored to the user's context. This ensures that each user
receives the most relevant information at a glance.

1. **Dive into the Backend Overview Code:**

   Navigate to apps/backend/src/overview to begin.

2. **Understanding the Three Key Files:**

    - `index.ts`:

      This file holds the core business logic. It processes and determines which sections to return based on various
      parameters and conditions.

    - `supported-blocks.ts`:

      A comprehensive list of all available sections and their corresponding stats can be found here. Think of it as a
      menu from which the user will be served.

    - `generate-sections.ts`:

      The magic happens here. This file contains the code that communicates with OpenAI's GPT. It requests GPT to
      reorder the
      sections, ensuring they align perfectly with the user's context.

   With these in place, our portal will be equipped to serve users with personalized, context-aware stats on the
   overview page.

### 5️⃣ Activating Dynamic Section Ordering

It's time to witness the dynamic ordering in action!

1. **Navigate to the Code:**

   If you aren't already there, head over to apps/backend/src/overview.

2. **Editing the index.ts File:**

    - **Commenting Out Static Sections:**

      Locate the section of code that statically defines the order of the stats. Once found, comment it out. This will
      disable the old static ordering system.

    - **Uncommenting Dynamic Ordering:**

      Find the section that's labeled or related to "generate ordered sections." Uncomment this section to activate the
      dynamic ordering system powered by OpenAI's GPT.

3. **Testing the Changes:**

   After making these edits, you might want to run your application to see the difference. You should now observe that
   the stats on the portal's overview page adapt and reorder based on the user's context.

### 6️⃣ Changing User Context & Observing Dynamic Ordering

Want to see the dynamic ordering adapt to different user contexts? Let's tweak the user context and watch the magic
unfold!

1. **Navigate to the Portal Main Code:**

   Head over to `apps/portal/main.tsx`.

2. **Editing the DummyDataProvider Component:**

    - **Locate the Component:**

      Find the DummyDataProvider component within the file.

    - **Modify the Property:**

      Change its property to: `userExamples.support`

    - Observing the Changes in the Portal:

      If your portal is currently running, either restart it or simply refresh the page.

3. **Let's change the user context to reflect an admin's perspective:**

    - In apps/portal/main.tsx, set DummyDataProvider to: `userExamples.admin`
    - Replace first two notifications in admin user's recentNotifications with:
        - "DDOS attack detected"
        - "14 security incidents revealed in the last hour"
    - Observing the Changes in the Portal:
      The stats on the overview page should now reflect the admin's security incidents.

### 8️⃣ Generating a Dynamic Overview Summary

To make the overview truly dynamic, we'll generate a summary based on the most relevant sections. Follow these steps:

1. **Setting up the Script File:**

   Create a new file generate-summary.ts in apps/backend/src/overview.

2. **Modifying the Ordering Logic:**

    - **Navigate to:** `apps/backend/src/overview/index.ts`

    - **Slice and Get Most Relevant Sections:**

      Extract the top two most relevant sections from the ordered list:

      ```javascript
      const mostRelevantSections = orderedSections.slice(0, 2);
      ```
    - **Generate the Dynamic Summary:**

      Call the function to generate the summary based on the top sections and user context:**

      ```javascript
      const summary = await generateOverviewSummary(mostRelevantSections, userContext);
      ```

      With this in place, the portal's overview will not only prioritize the most relevant sections but also provide a
      dynamically generated summary for a tailored user experience.

3. Craft Your Own Dynamic Prompt:

    - **Understanding Your Goal:**

      You aim to create a prompt that receives user context and crafts a concise summary for the top two relevant
      sections.

    - **Reference for Inspiration:**

      Peek into the generate-sections.ts file. Notice how prompts are structured there? It'll give you a solid
      foundation to
      start.

    - **Your Turn!:**

      Now, using the insights from generate-sections.ts, try to write the `generateOverviewSummary` function. Remember,
      you want to craft a prompt that takes into account the user context
      and the most relevant sections to produce a tailored summary.

Hint: Your function might start something like this:

```javascript

function generateOverviewSummary(sections, userContext) {
  const prompt = `...`; // Your crafted prompt here

  // ... Code to send this prompt to OpenAI's API and fetch the generated summary...

  return generatedSummary;
}

```

Give it a shot! Crafting this function is an excellent exercise in understanding how to bridge user context with
AI-driven content generation.

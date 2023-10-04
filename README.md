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




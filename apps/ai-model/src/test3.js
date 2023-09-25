// This code is for v4 of the openai package: npmjs.com/package/openai
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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"

});

const prefix = "what is the best search auto completion based on this category and actions:\n\n{category}: [actions list]\n\nconst data = {\n    'add new user': [\n      'How to add a new user?',\n      'Can you guide me on adding a new user?',\n      'Steps to add a new user?',\n      \n    ],\n    'add bulk users': [\n      'How can I add multiple users at once?',\n      'Is there a way to bulk add users?',\n      'Guide me on adding users in bulk',\n      'Steps to add multiple users in one go?',\n    ],\n    'filter by new users': [\n      'How do I filter users by \\'new\\' status?',\n      'Can you show me how to filter users by \\'new\\'?',\n      'Steps to filter users by new status?',\n      'Filtering users by new?',\n    ],\n    'display total active users': [\n      'How can I see the total number of active users?',\n      'Can I get the count of active users?',\n      'Steps to view the total active users?',\n      'Displaying the total active user count?',\n    ],\n    'sort by last visited': [\n      'How to sort users by their last visited date?',\n      'Is it possible to sort users by last visited?',\n      'Steps to sort users by last visited?',\n      'Sorting users by last visited date?',\n    ],\n    'sort by created date': [\n      'How do I sort users by their created date?',\n      'Can you guide me on sorting users by created date?',\n      'Steps to sort users by creation date?',\n      'Sorting users by created date?',\n    ],\n    'edit user role': [\n      'How can I edit a user\\'s role?',\n      'Is it possible to change a user\\'s role?',\n      'Steps to edit a user\\'s role?',\n      'Editing a user\\'s role?',\n    ]\n  };\n\nwhat is the next strict words to be appended to user input.\n\ninput: \"editing a us\"\noutput: {\nappend: \"er\\'s role?\",\ncategory:  \"edit user role\"\n}\n\n\n\ninput: how Do I\noutput: [{\nappend: \"change a user's role?\",\ncategory:  \"edit user role\"\n}, {\nappend: \"add a user?\",\ncategory:  \"add new user\"\n}]\n\n\ninput:\n\n\n";

async function run() {
  console.time("openai")
  const response = await openai.completions.create({
    model: "text-babbage-001",
    prompt: prefix + "how to add",
    temperature: 0.05,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response)
  console.timeEnd("openai")
}

run()

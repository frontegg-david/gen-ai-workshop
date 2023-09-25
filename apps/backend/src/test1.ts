
// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function test1(str) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "you are search suggestion for the following items:\n\n- Authenticate local user\n- Refresh JWT token\n- Logout user\n- Login via SSO provider\n- Login via SSO provider\n- Verify MFA using code from authenticator app\n- Verify MFA using authenticator app\n- login with SMS code prelogin\n- SMS code postlogin\n- Magic Link prelogin\n- Magic Link postlogin\n- OTC (One-Time Code) prelogin\n- OTC (One-Time Code) postlogin\n- total active users\n- total installed apps\n- how to mush active users\n- how to filter users?\n- show me last visited users\n- show me new users?\n- filter users by last visited\n\n\nthe user will start asking a question and the assistant will return the auto completion"
      },
      {
        "role": "user",
        "content": str
      }
    ],
    temperature: 0.15,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response.usage.total_tokens, response.choices[0].message)

  return response.choices.map(s => `${s.message.content}`).join('\n');
  // return response.choices;
}

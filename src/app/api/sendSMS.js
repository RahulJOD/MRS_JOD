import twilio from "twilio";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { phoneNumber, latitude, longitude } = req.body;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    const client = twilio(accountSid, authToken);

    try {
        const message = await client.messages.create({
            body: `Live Location: https://www.google.com/maps?q=${latitude},${longitude}`,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        res.status(200).json({ success: true, message: message.sid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

import { connectToDb } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req) => {
    try {
        await connectToDb();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
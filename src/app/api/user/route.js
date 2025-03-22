import { NextResponse } from "next/server";
import mongoConnect from "../../../../lib/mongoConnect";
import Link from "../../../../models/links";

export async function GET(request) {
    try {
        await mongoConnect();
        const { searchParams } = new URL(request.url);
        const user = searchParams.get("user");

        if (!user) {
            return NextResponse.json({ message: "User parameter is required" }, { status: 400 });
        }

        const userLinks = await Link.findOne({ user });

        if (!userLinks) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(userLinks, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}

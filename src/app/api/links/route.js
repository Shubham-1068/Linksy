import { NextResponse } from "next/server";
import mongoConnect from "../../../../lib/mongoConnect";
import Link from "../../../../models/links";

export async function GET(request) {
    await mongoConnect();

    const users = await Link.find({});

    return NextResponse.json(users, {status: 200});
}

export async function POST(request) {
    try {
        let data = await request.json();
        console.log(data.urls);

        await mongoConnect();

        const existingLink = await Link.findOne({ user: data.user });
        if (existingLink) {
            console.log("Links already exist for this user");
            return NextResponse.json({ message: "Links already exist for this user" }, { status: 400 });
        }

        const linkData = await Link.create({ user: data.user, urls: data.urls });

        if (!linkData) {
            return NextResponse.json({ message: "Links not created" }, { status: 400 });
        }

        return NextResponse.json(linkData, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}


export async function PATCH(request) {
    try {
        let data = await request.json();
        console.log("Updating links for user:", data.user);

        await mongoConnect();

        const updatedLink = await Link.findOneAndUpdate(
            { user: data.user },
            { $addToSet: { urls: { $each: data.urls } } },
            { new: true }
        );

        if (!updatedLink) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedLink, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}


export async function DELETE(request) {

    let data = await request.json();

    try{
        await mongoConnect();

        const updatedDocument = await Link.findOneAndUpdate(
            { user: data.user },
            { $pull: { urls: data.urlToDelete } },
            { new: true }
        );

        console.log("Updated document:", updatedDocument);

        if (!updatedDocument) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedDocument, { status: 200 });
    }
    catch(error){
        console.error("Error:", error);
    }
}
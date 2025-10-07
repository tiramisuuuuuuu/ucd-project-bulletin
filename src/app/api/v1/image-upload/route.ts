import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(`${process.env.SUPABASE_PROJECT_URL}`, `${process.env.SUPABASE_SERVICE_KEY}`)

export async function POST(req: NextRequest) {
    const user_id = req.headers.get("x-user-id")!;

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const file_path = `${user_id}/${Date.now()}`;

    const { error } = await supabase.storage
        .from('private-images')
        .upload(file_path, file);
    
    if (!error) {
        const { data, error } = await supabase.storage
            .from('private-images')
            .createSignedUrl(file_path, 3600)
        
        if (!error) {
            return new NextResponse(
                JSON.stringify({
                    temporary_url: data.signedUrl,
                    supabase_file_path: file_path
                }), 
                {
                    status: 200,
                    headers: { "content-type": "application/json" },
                }
            );
        }
    }

    return new NextResponse(
        JSON.stringify({ error: "Error creating resource" }), 
        {
            status: 400,
            headers: { "content-type": "application/json" },
        }
    );
}
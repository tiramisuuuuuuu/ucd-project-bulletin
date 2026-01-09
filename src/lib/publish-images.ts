import { createClient } from "@supabase/supabase-js";

const supabase = createClient(`${process.env.SUPABASE_PROJECT_URL}`, `${process.env.SUPABASE_SERVICE_KEY}`)

export async function makeImagePublic(supabase_file_path: string) {
    const { data: file, error } = await supabase.storage
        .from('private-images')
        .download(supabase_file_path);

    if (error) return null;

    const { error: uploadError } = await supabase.storage
        .from('public-images')
        .upload(supabase_file_path, file);

    if (uploadError) return null;

    await supabase.storage
        .from('private-images')
        .remove([supabase_file_path]);

    const { data } = supabase.storage
        .from('public-images')
        .getPublicUrl(supabase_file_path);

    return data.publicUrl;
}
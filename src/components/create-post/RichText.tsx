import { Typography } from "antd";

export default function RichText({ text } : { text: string }) {
    const blocks = text.split('\n');
    return (
        <>
            {blocks.map((textBlock, idx) =>
                <Typography.Paragraph key={idx}>
                    {textBlock}
                </Typography.Paragraph>
            )}
        </>
    );
}

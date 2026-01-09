import React from 'react';
import { Image } from 'antd';

interface MultipleImageProps {
  images: string[];
}

export default function MultipleImage({ images }: MultipleImageProps) {
    return (
        <div className='w-full'>
            <Image.PreviewGroup
                preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
            >
                {images.map((url) => 
                    <Image
                        alt="attachment"
                        width={200}
                        src={url}
                    />
                )}
            </Image.PreviewGroup>
        </div>
    );
}

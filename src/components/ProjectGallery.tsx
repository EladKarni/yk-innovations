"use client";

import { FC, useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

interface ProjectGalleryProps {
    images: string[];
    projectTitle: string;
}

const ProjectGallery: FC<ProjectGalleryProps> = ({ images, projectTitle }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((imageUrl, index) => (
                    <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="relative h-64 rounded-lg overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        <Image
                            src={imageUrl}
                            alt={`${projectTitle} gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>

            <ImageLightbox
                images={images}
                initialIndex={selectedIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                altPrefix={`${projectTitle} gallery image`}
            />
        </>
    );
};

export default ProjectGallery;

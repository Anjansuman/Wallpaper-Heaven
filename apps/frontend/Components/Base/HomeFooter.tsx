'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';

type FooterSection = {
    title: string;
    items: { label: string; href: string }[];
    delay: string;
};

const obj = [
    {
        icon: IconBrandTwitter,
        url: 'https://x.com/triangulum-x',
    },
    {
        icon: IconBrandInstagram,
        url: 'https://github.com/celestium-x/triangulum-x',
    },
];

const footerSections: FooterSection[] = [
    {
        title: 'Try Triangulum',
        items: [
            { label: 'Overview', href: '/overview' },
            { label: 'Features', href: '/features' },
            { label: 'Quiz', href: '/quiz' },
            { label: 'Live polling', href: '/live-polling' },
        ],
        delay: '100ms',
    },
    {
        title: 'Company',
        items: [
            { label: 'Company', href: '/company' },
            { label: 'Founders', href: '/founders' },
            { label: 'Contact', href: '/contact' },
        ],
        delay: '200ms',
    },
    {
        title: 'Details',
        items: [
            { label: 'Documentation', href: '/docs' },
            { label: 'Privacy policy', href: '/privacy' },
            { label: 'Security', href: '/security' },
            { label: 'Safety', href: '/safety' },
            { label: 'Legal', href: '/legal' },
        ],
        delay: '300ms',
    },
];

export default function HomeScreenFooter() {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const footerElement = document.getElementById('animated-footer');
        if (!footerElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry) {
                    setIsVisible(entry.isIntersecting);
                }
            },
            { threshold: 0.1, rootMargin: '50px 0px -50px 0px' },
        );

        observer.observe(footerElement);
        return () => observer.unobserve(footerElement);
    }, []);

    return (
        <footer
            id="animated-footer"
            className="relative w-full min-h-5xl mt-40 pb-30 text-black overflow-hidden select-none"
        >
            <div
                className={cn(
                    'absolute inset-0 transition-all duration-[1500ms] ease-out',
                    isVisible ? 'opacity-100' : 'opacity-0',
                )}
                style={{
                    background: `
            radial-gradient(ellipse at center bottom, 
            rgba(208, 193, 233, 0.5) 0%, 
            rgba(208, 193, 233, 0.4) 15%, 
            rgba(208, 193, 233, 0.3) 25%, 
            rgba(208, 193, 233, 0.25) 35%, 
            rgba(208, 193, 233, 0.2) 45%, 
            rgba(208, 193, 233, 0.15) 55%, 
            #FFFFFF 65%, 
            #FFFFFF 100%
        )
        `,
                }}
            />

            <div
                className={cn(
                    'relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-20',
                    'transition-all duration-[1200ms] ease-out delay-200',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                )}
            >
                <div className="grid grid-cols-4 gap-40">
                    <div
                        className={cn(
                            'flex-col transition-all duration-1000 ease-out',
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                        )}
                        style={{ transitionDelay: '600ms' }}
                    >
                        Wallpaper Heaven
                        <div className="w-full flex gap-x-2.5 pt-4">
                            {obj.map((item, idx) => (
                                <span
                                    key={idx}
                                    onClick={() => window.open(item.url, '_blank')}
                                    className={cn(
                                        'h-10 w-10 rounded-full border p-2 flex justify-center items-center bg-neutral-200/70 cursor-pointer',
                                        'transition-all duration-700 ease-out hover:scale-110 hover:bg-neutral-800/80',
                                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                                    )}
                                    style={{ transitionDelay: `${800 + idx * 100}ms` }}
                                >
                                    <item.icon className="h-4.5 w-4.5" />
                                </span>
                            ))}
                        </div>
                    </div>

                    {footerSections.map((section) => (
                        <div
                            key={section.title}
                            className={cn(
                                'space-y-6 transition-all duration-1000 ease-out',
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                            )}
                            style={{ transitionDelay: section.delay }}
                        >
                            <h4 className="uppercase text-[13px] tracking-[0.15em] text-neutral-800 font-medium">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.items.map((item, itemIndex) => (
                                    <li
                                        key={item.label}
                                        className={cn(
                                            'transition-all duration-700 ease-out cursor-pointer',
                                            isVisible
                                                ? 'opacity-100 translate-x-0'
                                                : 'opacity-0 translate-x-2',
                                        )}
                                        style={{
                                            transitionDelay: `${parseInt(section.delay) + itemIndex * 100
                                                }ms`,
                                        }}
                                        onClick={() => router.push(item.href)}
                                    >
                                        <span className="text-neutral-8-- hover:text-[#9573E1] transition-colors duration-300 text-sm">
                                            {item.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

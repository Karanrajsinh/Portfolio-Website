"use client"

import { ShimmerButton } from "./ui/shimmer-button"

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()}  Karanrajsinh Vaghela. All rights reserved.
                </p>

                <div className="flex items-center">
                    <ShimmerButton onClick={scrollToTop} className="h-8">
                        Back to Top
                    </ShimmerButton>
                </div>
            </div>
        </footer>
    )
}
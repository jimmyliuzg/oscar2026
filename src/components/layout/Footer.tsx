export default function Footer() {
    return (
        <footer className="border-t border-accent-light py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🎬</span>
                        <span className="font-accent text-text-light">
                            The 98th Academy Awards | 2026
                        </span>
                    </div>

                    <p className="text-text-muted text-sm">
                        Sunday, March 15, 2026 • 4:00 PM
                    </p>

                    <p className="text-text-muted text-xs">
                        By @jimmyliuzg • Made with ❤️ for movie lovers
                    </p>
                </div>
            </div>
        </footer>
    );
}

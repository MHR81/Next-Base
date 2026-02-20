'use client';

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-error mb-4">خطای سیستمی</h2>
                        <button onClick={reset}>تلاش مجدد</button>
                    </div>
                </div>
            </body>
        </html>
    );
}
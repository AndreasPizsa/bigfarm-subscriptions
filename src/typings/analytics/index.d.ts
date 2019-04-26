declare interface Analytics {
    load(key: string): void;
    page(): void;
}

interface Window {
    analytics: Analytics;
}

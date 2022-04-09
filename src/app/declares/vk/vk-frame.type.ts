declare const VK: VKMainFrame

type VKMainFrame = {
    Auth: VKAuth
}

interface VKAuth{
    login(callback: (s: VKSessionResponse) => void, settingsMask: number): void;
}

interface VKSessionResponse{
    session: {
        secret: string
    },
    status: string
}

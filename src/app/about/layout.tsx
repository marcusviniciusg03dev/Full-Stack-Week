import { ReactNode } from "react";

const AboutLayout = ({ children } : { children: ReactNode }) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default AboutLayout;
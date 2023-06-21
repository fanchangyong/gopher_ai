import { FC, ReactNode } from "react";
import { AgentProvider } from "../../contexts";


type Props = {
    children: ReactNode;
}

const AgentsLayout: FC<Props> = ({ children }) => {
    return (
        <AgentProvider>
            {children}
        </AgentProvider>
    );
};

export default AgentsLayout;
import {useState} from 'react';
import {BiomedicalRagScores1} from "./biomedicalVisualization1.tsx";
import {BiomedicalRagScores2} from "./biomedicalVisualization2.tsx";
import {BiomedicalRagScores3} from "./biomedicalVisualization3.tsx";
import {BiomedicalRagScores4} from "./biomedicalVisualization4.tsx";
import {BiomedicalRagScores5} from "./biomedicalVisualization5.tsx";
import QdrantExecutionTimeComparison from "./qdrantBenchmarkTest.tsx";

const ImprovedTabbedInterface = () => {
    const [activeTab, setActiveTab] = useState('home');

    // Define tabs and their content
    const tabs = [
        {
            id: 'Experiment-1',
            label: 'Experiment-1',
            content: (
                <div>
                    <BiomedicalRagScores1/>
                </div>
            )
        },
        {
            id: 'Experiment-2',
            label: 'Experiment-2',
            content: (
                <div>
                    <BiomedicalRagScores2/>
                </div>
            )
        },
        {
            id: 'Experiment-3',
            label: 'Experiment-3',
            content: (
                <div>
                    <BiomedicalRagScores3/>
                </div>
            )
        },
        {
            id: 'Experiment-4',
            label: 'Experiment-4',
            content: (
                <div>
                    <BiomedicalRagScores4/>
                </div>
            )
        },
        {
            id: 'Experiment-5',
            label: 'Experiment-5',
            content: (
                <div>
                    <BiomedicalRagScores5/>
                </div>
            )
        },
        {
            id: 'Experiment-6',
            label: 'Qdrant Ingestion Time Comparison',
            content: (
                <div>
                    <QdrantExecutionTimeComparison/>
                </div>
            )
        }
    ];

    const containerStyle = {
        padding: '1rem',
        width: '100%',
        maxWidth: '56rem',
        margin: '0 auto'
    };

    const tabNavStyle = {
        display: 'flex',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '1.5rem'
    };

    const getTabButtonStyle = (tabId: any) => ({
        padding: '0.5rem 1rem',
        fontWeight: '500',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        borderBottom: activeTab === tabId ? '2px solid #2563eb' : 'none',
        color: activeTab === tabId ? '#2563eb' : '#6b7280'
    });

    const contentContainerStyle = {
        backgroundColor: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        minHeight: '16rem'
    };

    return (
        <div style={containerStyle}>
            <h1>Impact of Embedding Fine-tuning, Chunk Size and Chunk Overlap on RAG</h1>

            {/* Tab Navigation */}
            <div style={tabNavStyle}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        style={getTabButtonStyle(tab.id)}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div style={contentContainerStyle}>
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default ImprovedTabbedInterface;
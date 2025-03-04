import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

export const BiomedicalRagScores2 = () => {
    const data = [
        { questionId: 1, ansRel: 1.00, ctxRel: 0.12 },
        { questionId: 2, ansRel: 0.92, ctxRel: 0.07 },
        { questionId: 3, ansRel: 0.40, ctxRel: 0.00 },
        { questionId: 4, ansRel: 0.57, ctxRel: 0.00 },
        { questionId: 5, ansRel: 1.00, ctxRel: 0.28 },
        { questionId: 6, ansRel: 0.90, ctxRel: 0.07 },
        { questionId: 7, ansRel: 0.90, ctxRel: 0.06 },
        { questionId: 8, ansRel: 0.80, ctxRel: 0.04 },
        { questionId: 9, ansRel: 1.00, ctxRel: 0.07 },
        { questionId: 10, ansRel: 1.00, ctxRel: 0.06 }
    ];

    // Calculate averages
    const avgAnsRel = data.reduce((sum, item) => sum + item.ansRel, 0) / data.length;
    const avgCtxRel = data.reduce((sum, item) => sum + item.ctxRel, 0) / data.length;

    // Prepare data for scatter plot
    const scatterData = data.map(item => ({
        x: item.ctxRel,
        y: item.ansRel,
        z: 10,
        name: `Q${item.questionId}`
    }));

    // Calculate correlation coefficient
    const calculateCorrelation = (x: any, y: any) => {
        const n = x.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

        for (let i = 0; i < n; i++) {
            sumX += x[i];
            sumY += y[i];
            sumXY += x[i] * y[i];
            sumX2 += x[i] * x[i];
            sumY2 += y[i] * y[i];
        }

        const numerator = n * sumXY - sumX * sumY;
        const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

        return denominator === 0 ? 0 : numerator / denominator;
    };

    const correlation = calculateCorrelation(
        data.map(item => item.ctxRel),
        data.map(item => item.ansRel)
    ).toFixed(2);

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Biomedical RAG Evaluation Scores </h1>
            <h4 className="text-sm mb-6 text-center">(chunk size: 512, chunk overlap: 100, embedding: pavanmantha/distilroberta-pubmed-embeddings)</h4>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Answer vs Context Relevancy by Question</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="questionId" label={{ value: 'Question ID', position: 'insideBottom', offset: -5 }} />
                            <YAxis domain={[0, 1.1]} label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value: any) => value.toFixed(2)} />
                            <Legend />
                            <ReferenceLine y={avgAnsRel} stroke="#8884d8" strokeDasharray="3 3">
                                <Label value={`Avg Ans: ${avgAnsRel.toFixed(2)}`} position="right" />
                            </ReferenceLine>
                            <ReferenceLine y={avgCtxRel} stroke="#82ca9d" strokeDasharray="3 3">
                                <Label value={`Avg Ctx: ${avgCtxRel.toFixed(2)}`} position="right" />
                            </ReferenceLine>
                            <Bar dataKey="ansRel" name="Answer Relevancy" fill="#8884d8" />
                            <Bar dataKey="ctxRel" name="Context Relevancy" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Relationship Between Context and Answer Relevancy</h2>
                <p className="mb-2 text-sm">Correlation Coefficient: {correlation}</p>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey="x"
                                name="Context Relevancy"
                                domain={[0, 0.4]}
                                label={{ value: 'Context Relevancy', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis
                                type="number"
                                dataKey="y"
                                name="Answer Relevancy"
                                domain={[0.5, 1.1]}
                                label={{ value: 'Answer Relevancy', angle: -90, position: 'insideLeft' }}
                            />
                            <ZAxis type="number" dataKey="z" range={[60, 400]} />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                formatter={(value: any, name: any) => [value.toFixed(2), name]}
                                labelFormatter={(value: any) => value}
                                content={(props) => {
                                    const { active, payload } = props;
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white p-2 border border-gray-300 rounded shadow-sm">
                                                <p>{`${payload[0].payload.name}`}</p>
                                                <p>{`Ctx: ${payload[0].value.toFixed(2)}`}</p>
                                                <p>{`Ans: ${payload[0].payload.y.toFixed(2)}`}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Scatter
                                name="Questions"
                                data={scatterData}
                                fill="#8884d8"
                                shape="circle"
                                label={(props) => {
                                    const { x, y, name } = props;
                                    return (
                                        <text x={x} y={y} dy={-10} fill="#666" fontSize={10} textAnchor="middle">
                                            {name}
                                        </text>
                                    );
                                }}
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                    <h3 className="font-semibold mb-2">Summary Statistics</h3>
                    <ul className="list-disc pl-5">
                        <li>Average Answer Relevancy: {avgAnsRel.toFixed(2)}</li>
                        <li>Average Context Relevancy: {avgCtxRel.toFixed(2)}</li>
                        <li>Correlation: {correlation}</li>
                    </ul>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                    <h3 className="font-semibold mb-2">Key Observations</h3>
                    <ul className="list-disc pl-5">
                        <li>High answer relevancy despite very low context relevancy</li>
                        <li>Questions 1, 5, 9, and 10 have perfect answer relevancy scores (1.00)</li>
                        <li>Question 3 has the lowest answer relevancy (0.40)</li>
                        <li>Question 5 has the highest context relevancy (0.28)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
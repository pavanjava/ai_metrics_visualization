import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const QdrantExecutionTimeComparison = () => {
    // Raw data from the prompt
    const rawData = [
        { benchmark: '15492', mac: 321.2536, researchX: 158.9588 },
        { benchmark: '31168', mac: 647.2424, researchX: 309.7250 },
        { benchmark: '155283', mac: 2873.2882, researchX: 1548.4074 },
        { benchmark: '309935', mac: 6852.9887, researchX: 3095.8304 }
    ];

    // Convert seconds to hours (3600 seconds = 1 hour)
    const data = rawData.map(item => ({
        benchmark: item.benchmark,
        mac: parseFloat((item.mac / 3600).toFixed(4)),
        researchX: parseFloat((item.researchX / 3600).toFixed(4))
    }));

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Ingestion Time Comparison: Mac vs AWS-g5(ResearchX) (in hours)</h2>
            <div className="flex flex-col items-center w-full p-4">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 30,
                        }}
                        barSize={40}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="benchmark"
                            label={{ value: 'Number of points', position: 'bottom', offset: 0 }}
                        />
                        <YAxis
                            label={{ value: 'Time (hours)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                            formatter={(value) => [`${value} hours`, '']}
                            labelFormatter={(label) => `Benchmark: ${label}`}
                        />
                        <Legend verticalAlign="top" />
                        <Bar dataKey="mac" name="Mac" fill="#8884d8" />
                        <Bar dataKey="researchX" name="ResearchX" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg w-full">
                <h3 className="text-lg font-semibold mb-2">Execution Time Details</h3>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 text-left">Benchmark</th>
                        <th className="p-2 text-left">Mac (hours)</th>
                        <th className="p-2 text-left">ResearchX (hours)</th>
                        <th className="p-2 text-left">Speed Improvement</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="p-2 border">{item.benchmark}</td>
                            <td className="p-2 border">{item.mac}</td>
                            <td className="p-2 border">{item.researchX}</td>
                            <td className="p-2 border">{`${(item.mac / item.researchX).toFixed(2)}x`}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold mb-2">Technical Details of AWS-g5 (ResearchX) machine</h3>
                <ul className="list-disc pl-5">
                    <li>Instance Size: g5.xlarge</li>
                    <li>GPU: 1</li>
                    <li>GPU Memory (GiB): 24</li>
                    <li>vCPUs: 4</li>
                    <li>Memory (GiB): 16</li>
                    <li>Storage (GB): 1x250</li>
                    <li>Network Bandwidth (Gbps): Up to 10</li>
                    <li>EBS Bandwidth (Gbps): Up to 3.5</li>
                </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold mb-2">Technical Details of Mac machine</h3>
                <ul className="list-disc pl-5">
                    <li>CPU Architecture: ARM-based (Apple Silicon)</li>
                    <li>CPU Cores: 8-core CPU (6 performance cores, 2 efficiency cores)</li>
                    <li>GPU Cores: 14-core GPU</li>
                    <li>GPU Performance: Up to 5.2 teraflops of compute power</li>
                    <li>Memory Type: Unified LPDDR5 memory</li>
                    <li>Memory Configuration: 16GB options</li>
                    <li>Memory Bandwidth: Up to 200GB/s</li>
                </ul>
            </div>
        </div>

    );
};

export default QdrantExecutionTimeComparison;
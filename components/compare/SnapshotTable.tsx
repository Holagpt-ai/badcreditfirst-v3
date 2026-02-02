import type { ComparisonPage } from '@/data/comparisons';

interface Props {
  data: ComparisonPage;
}

export default function SnapshotTable({ data }: Props) {
  const { entityA, entityB, snapshotA, snapshotB } = data;
  return (
    <section className="mb-8 overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-200">
            <th className="px-4 py-3 font-semibold text-slate-800">Factor</th>
            <th className="px-4 py-3 font-semibold text-slate-800">{entityA.name}</th>
            <th className="px-4 py-3 font-semibold text-slate-800">{entityB.name}</th>
          </tr>
        </thead>
        <tbody className="text-slate-600">
          <tr className="border-b border-slate-100">
            <td className="px-4 py-3 font-medium text-slate-700">Approval</td>
            <td className="px-4 py-3">{snapshotA.approvalType}</td>
            <td className="px-4 py-3">{snapshotB.approvalType}</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="px-4 py-3 font-medium text-slate-700">Deposit</td>
            <td className="px-4 py-3">{snapshotA.deposit}</td>
            <td className="px-4 py-3">{snapshotB.deposit}</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="px-4 py-3 font-medium text-slate-700">Fees</td>
            <td className="px-4 py-3">{snapshotA.fees}</td>
            <td className="px-4 py-3">{snapshotB.fees}</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-700">Reporting</td>
            <td className="px-4 py-3">{snapshotA.reporting}</td>
            <td className="px-4 py-3">{snapshotB.reporting}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

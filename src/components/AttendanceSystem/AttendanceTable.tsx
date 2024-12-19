import React, { useState } from 'react';
import { Pencil, Trash, Check, X } from 'lucide-react';
import { AttendanceRecord } from '../../types/attendance';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  isAdmin: boolean;
  onEdit: (record: AttendanceRecord) => void;
  onDelete: (id: number) => void;
}

export default function AttendanceTable({
  records,
  isAdmin,
  onEdit,
  onDelete
}: AttendanceTableProps) {
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [editForm, setEditForm] = useState<Partial<AttendanceRecord>>({});

  const handleEditClick = (record: AttendanceRecord) => {
    setEditingRecord(record);
    setEditForm(record);
  };

  const handleSaveEdit = () => {
    if (editingRecord && editForm) {
      onEdit({ ...editingRecord, ...editForm });
      setEditingRecord(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
    setEditForm({});
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingRecord?.id === record.id ? (
                    <input
                      type="text"
                      value={editForm.studentCode || ''}
                      onChange={(e) => setEditForm({ ...editForm, studentCode: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    record.studentCode
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingRecord?.id === record.id ? (
                    <input
                      type="text"
                      value={editForm.studentName || ''}
                      onChange={(e) => setEditForm({ ...editForm, studentName: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    record.studentName
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingRecord?.id === record.id ? (
                    <input
                      type="date"
                      value={editForm.date || ''}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    record.date
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingRecord?.id === record.id ? (
                    <input
                      type="time"
                      value={editForm.time || ''}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    record.time
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingRecord?.id === record.id ? (
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'Present' | 'Absent' | 'Late' })}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'Present'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'Late'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  )}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingRecord?.id === record.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(record)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(record.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
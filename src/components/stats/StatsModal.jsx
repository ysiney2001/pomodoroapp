import React, { useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import Modal from '../ui/Modal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, Target, TrendingUp } from 'lucide-react';
import { formatDuration } from '../../utils/timeUtils';

const StatsModal = () => {
  const { state, dispatch } = useApp();
  
  const statsData = useMemo(() => {
    const { dailyStats, totalSessions, totalFocusTime } = state.stats;
    
    // Last 7 days data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = dailyStats[dateStr] || { sessions: 0, focusTime: 0 };
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        sessions: dayData.sessions,
        focusTime: dayData.focusTime
      });
    }
    
    // Weekly summary
    const weeklyTotal = last7Days.reduce((acc, day) => ({
      sessions: acc.sessions + day.sessions,
      focusTime: acc.focusTime + day.focusTime
    }), { sessions: 0, focusTime: 0 });
    
    return {
      last7Days,
      weeklyTotal,
      totalSessions,
      totalFocusTime
    };
  }, [state.stats]);

  const pieData = [
    { name: 'Focus Time', value: statsData.totalFocusTime, color: '#ef4444' },
    { name: 'Break Time', value: Math.round(statsData.totalFocusTime * 0.3), color: '#22c55e' }
  ];

  return (
    <Modal
      isOpen={state.showStatsModal}
      onClose={() => dispatch({ type: 'CLOSE_STATS_MODAL' })}
      title="Statistics & Reports"
      size="xl"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 dark:text-red-400">Total Sessions</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                  {statsData.totalSessions}
                </p>
              </div>
              <Target className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Focus Time</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {formatDuration(statsData.totalFocusTime)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">This Week</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {statsData.weeklyTotal.sessions}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Weekly Focus</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {formatDuration(statsData.weeklyTotal.focusTime)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Sessions Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Daily Sessions (Last 7 Days)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statsData.last7Days}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: state.theme === 'dark' ? '#374151' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="sessions" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Focus Time Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Daily Focus Time (Last 7 Days)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={statsData.last7Days}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: state.theme === 'dark' ? '#374151' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [formatDuration(value), 'Focus Time']}
                />
                <Line 
                  type="monotone" 
                  dataKey="focusTime" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Distribution */}
        {statsData.totalFocusTime > 0 && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Time Distribution
            </h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatDuration(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.name}: {formatDuration(entry.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {statsData.totalSessions === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No data yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Complete your first Pomodoro session to see statistics here.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default StatsModal;
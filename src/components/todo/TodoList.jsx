import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Edit2, Trash2, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const TodoList = () => {
  const { state, dispatch, saveUserData } = useApp();
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = async () => {
    if (!newTask.trim()) return;
    
    const task = {
      id: uuidv4(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      pomodoroCount: 0
    };
    
    dispatch({ type: 'ADD_TASK', payload: task });
    setNewTask('');
    await saveUserData();
    toast.success('Task added!');
  };

  const toggleTask = async (taskId) => {
    const task = state.tasks.find(t => t.id === taskId);
    dispatch({ 
      type: 'UPDATE_TASK', 
      payload: { id: taskId, completed: !task.completed }
    });
    await saveUserData();
  };

  const deleteTask = async (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
    await saveUserData();
    toast.success('Task deleted!');
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = async () => {
    if (!editText.trim()) return;
    
    dispatch({ 
      type: 'UPDATE_TASK', 
      payload: { id: editingTask, text: editText.trim() }
    });
    setEditingTask(null);
    setEditText('');
    await saveUserData();
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  const setCurrentTask = async (taskId) => {
    dispatch({ 
      type: 'UPDATE_TIMER', 
      payload: { currentTask: taskId }
    });
    await saveUserData();
    toast.success('Task linked to current session!');
  };

  const activeTasks = state.tasks.filter(task => !task.completed);
  const completedTasks = state.tasks.filter(task => task.completed);

  return (
    <div className="mt-12">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Tasks
        </h2>
        
        {/* Add new task */}
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="input flex-1"
          />
          <Button onClick={addTask} variant="primary">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Active tasks */}
        <div className="space-y-3">
          <AnimatePresence>
            {activeTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-center space-x-3 p-3 rounded-xl border ${
                  state.timerState.currentTask === task.id
                    ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-700'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 transition-colors flex items-center justify-center"
                >
                  {task.completed && <Check className="w-3 h-3 text-primary-600" />}
                </button>
                
                {editingTask === task.id ? (
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="input flex-1"
                      autoFocus
                    />
                    <Button size="sm" onClick={saveEdit} variant="success">
                      Save
                    </Button>
                    <Button size="sm" onClick={cancelEdit} variant="secondary">
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className={`flex-1 text-gray-900 dark:text-gray-100 ${
                      task.completed ? 'line-through opacity-60' : ''
                    }`}>
                      {task.text}
                    </span>
                    
                    {task.pomodoroCount > 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.pomodoroCount}
                      </span>
                    )}
                    
                    <div className="flex space-x-1">
                      {!task.completed && state.timerState.currentTask !== task.id && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setCurrentTask(task.id)}
                          className="p-1"
                          title="Link to current session"
                        >
                          <Clock className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEdit(task)}
                        className="p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completed tasks */}
        {completedTasks.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Completed ({completedTasks.length})
            </h3>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/30"
                >
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="flex-1 text-gray-600 dark:text-gray-400 line-through text-sm">
                    {task.text}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {state.tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
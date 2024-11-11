import React, { useState } from 'react';
import { questions } from '../data/questions';
import { Question, QuestionCategory } from '../types';
import { PlusCircle, Edit2, Trash2, Save, X } from 'lucide-react';

const categories: QuestionCategory[] = ['fun', 'deep', 'spicy', 'daily'];

export default function Admin() {
  const [localQuestions, setLocalQuestions] = useState<Question[]>(questions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    category: 'fun',
    intensity: 1
  });

  const handleSave = (question: Question) => {
    const updatedQuestions = localQuestions.map(q => 
      q.id === question.id ? question : q
    );
    setLocalQuestions(updatedQuestions);
    setEditingId(null);
    // In a real app, we'd persist this to a database
    console.log('Saving questions:', updatedQuestions);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setLocalQuestions(questions => questions.filter(q => q.id !== id));
    }
  };

  const handleAdd = () => {
    if (!newQuestion.text?.trim()) return;
    
    const newId = Math.max(...localQuestions.map(q => q.id)) + 1;
    const questionToAdd: Question = {
      id: newId,
      text: newQuestion.text,
      category: newQuestion.category as QuestionCategory,
      intensity: newQuestion.intensity || 1
    };

    setLocalQuestions([...localQuestions, questionToAdd]);
    setNewQuestion({ category: 'fun', intensity: 1 });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Question Management</h2>

        {/* Add New Question */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-rose-500" />
            Add New Question
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text
              </label>
              <input
                type="text"
                value={newQuestion.text || ''}
                onChange={e => setNewQuestion({ ...newQuestion, text: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="Enter question text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newQuestion.category}
                  onChange={e => setNewQuestion({ ...newQuestion, category: e.target.value as QuestionCategory })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intensity (1-3)
                </label>
                <input
                  type="number"
                  min="1"
                  max="3"
                  value={newQuestion.intensity || 1}
                  onChange={e => setNewQuestion({ ...newQuestion, intensity: parseInt(e.target.value) })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Add Question
            </button>
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-4">
          {localQuestions.map(question => (
            <div key={question.id} className="border rounded-lg p-4">
              {editingId === question.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={question.text}
                    onChange={e => {
                      const updated = { ...question, text: e.target.value };
                      setLocalQuestions(questions =>
                        questions.map(q => (q.id === question.id ? updated : q))
                      );
                    }}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={question.category}
                      onChange={e => {
                        const updated = { ...question, category: e.target.value as QuestionCategory };
                        setLocalQuestions(questions =>
                          questions.map(q => (q.id === question.id ? updated : q))
                        );
                      }}
                      className="rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      max="3"
                      value={question.intensity}
                      onChange={e => {
                        const updated = { ...question, intensity: parseInt(e.target.value) };
                        setLocalQuestions(questions =>
                          questions.map(q => (q.id === question.id ? updated : q))
                        );
                      }}
                      className="rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleSave(question)}
                      className="p-2 text-rose-500 hover:text-rose-600"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium mb-2">{question.text}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="capitalize">{question.category}</span>
                      <span>Intensity: {question.intensity}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(question.id)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="p-2 text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
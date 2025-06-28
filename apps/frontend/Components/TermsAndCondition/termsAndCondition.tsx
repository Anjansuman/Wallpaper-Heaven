"use client";

import React, { useState } from "react";

interface TermSection {
    id: number;
    title: string;
    highlight: string;
    content: string;
}

interface EditSectionProps {
    section: TermSection;
    onSave: (id: number, newContent: Partial<TermSection>) => void;
    onClose: () => void;
}

export const TermsAndConditions = () => {
    const [editingSection, setEditingSection] = useState<TermSection | null>(null);
    const [termsData, setTermsData] = useState<TermSection[]>([]);

    const saveEdit = (id: number, newContent: Partial<TermSection>) => {
        setTermsData(prevData =>
            prevData.map(term =>
                term.id === id ? {...term, ...newContent} : term
            )
        );
        setEditingSection(null);
    };

    const addSection = () => {
        const newId = termsData.length > 0 ? Math.max(...termsData.map(t => t.id)) + 1 : 1;
        const newSection = {
            id: newId,
            title: "New Section",
            highlight: "",
            content: "Add your terms and conditions content here.."
        };
        setTermsData([...termsData, newSection]);
        setEditingSection(newSection);
    };

    const EditSection: React.FC<EditSectionProps> = ({section, onSave, onClose}) => {
        const [editData, setEditData] = useState<TermSection>(section);

        const dataSave = () => {
            if (!editData.title.trim() || !editData.content.trim()) {
                alert("Fill in title and content");
                return;
            }
            onSave(section.id, editData)
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">
                        {section.id ? "Edit Section" : "Create New Section"}
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Section Title
                            </label>
                            <input
                               type="text"
                               value={editData.title}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData({...editData, title: e.target.value})}
                               placeholder="......"
                               className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base leading-relaxed"
                            />
                        </div>

                        <div>
                            <label>
                                Content
                            </label>
                            <textarea
                               value={editData.content}
                               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditData({...editData, content: e.target.value})}
                               placeholder="Write the content of the title..."
                               rows={10}
                               className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base leading-relaxed"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                           onClick={dataSave}
                           className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                        >
                            Save Section
                        </button>
                        <button
                           onClick={onClose}
                           className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };



    return (
        <div className="max-w-4xl mx-auto bg-white min-h-screen">
            <div className="mt-16 border-t-4 border-b-4 border-black pt-8 pb-6 mb-8">
                <h1 className="text-center text-3xl font-bold tracking-wider text-black">
                    TERMS & CONDITIONS
                </h1>
            </div>

            <div className="flex justify-center mb-8">
                <button
                   onClick={addSection}
                   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
                >
                    Add Section
                </button>
            </div>

            <div>
                {termsData.length === 0 ? (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold text-gray-600 mb-4">No terms created yet</h2>
                        <p className="text-gray-500">Click "Add Section" to get started</p>
                    </div>
                ) : (
                    <div>
                        {termsData.map((term: TermSection) => (
                            <div key={term.id} className="relative">
                                <div className="absolute -top-2 -right-2 flex gap-2 z-10">
                                    <button
                                       onClick={() => setEditingSection(term)}
                                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors shadow-lg"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold mb-4 text-black underline">
                                        {term.title}
                                    </h2>
                                    <div className="text-justify text-black leading-relaxed text-base">
                                        {term.content.split("\n").map((paragraph, index) => (
                                            <p key={index} className={paragraph.trim() ? "mb-4" : ""}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {termsData.length > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8 text-center">
                        <p className="text-green-700 font-medium">
                            {termsData.length} sections published
                        </p>
                    </div>
                )}
            </div>

            {editingSection && (
                <EditSection
                   section={editingSection}
                   onSave={saveEdit}
                   onClose={() => setEditingSection(null)}
                />
            )}
        </div>
    );
};
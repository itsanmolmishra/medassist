import { useState } from 'react';
import { Search, Check, AlertCircle, Activity } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface Symptom {
  id: string;
  name: string;
  relatedTests: string[];
}

const commonSymptoms: Symptom[] = [
  { id: '1', name: 'Fatigue / Tiredness', relatedTests: ['Hemoglobin', 'RBC Count', 'TSH', 'Glucose'] },
  { id: '2', name: 'Frequent Urination', relatedTests: ['Glucose', 'HbA1c', 'Creatinine'] },
  { id: '3', name: 'Dizziness', relatedTests: ['Hemoglobin', 'Blood Pressure', 'Glucose'] },
  { id: '4', name: 'Chest Pain', relatedTests: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
  { id: '5', name: 'Shortness of Breath', relatedTests: ['Hemoglobin', 'RBC Count', 'Oxygen Saturation'] },
  { id: '6', name: 'Unexplained Weight Loss', relatedTests: ['TSH', 'Glucose', 'HbA1c'] },
  { id: '7', name: 'Increased Thirst', relatedTests: ['Glucose', 'HbA1c', 'Sodium', 'Potassium'] },
  { id: '8', name: 'Weakness', relatedTests: ['Hemoglobin', 'Potassium', 'Vitamin D', 'Vitamin B12'] },
];

interface SymptomMatcherProps {
  availableTests: string[];
}

export function SymptomMatcher({ availableTests }: SymptomMatcherProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const getRelatedTestsForSelected = () => {
    const allRelatedTests = new Set<string>();
    selectedSymptoms.forEach(symptomId => {
      const symptom = commonSymptoms.find(s => s.id === symptomId);
      symptom?.relatedTests.forEach(test => allRelatedTests.add(test));
    });
    return Array.from(allRelatedTests);
  };

  const relatedTests = getRelatedTestsForSelected();
  const matchedTests = relatedTests.filter(test => 
    availableTests.some(available => available.toLowerCase().includes(test.toLowerCase()))
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">Symptom-to-Test Matcher</h3>
          <p className="text-sm text-muted-foreground">
            Select your symptoms to see which tests are related
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search symptoms..."
          className="pl-10"
        />
      </div>

      {/* Symptom List */}
      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
        {filteredSymptoms.map((symptom) => (
          <button
            key={symptom.id}
            onClick={() => toggleSymptom(symptom.id)}
            className={`
              w-full flex items-center justify-between p-3 rounded-lg border transition-all
              ${selectedSymptoms.includes(symptom.id)
                ? 'bg-primary/10 border-primary'
                : 'bg-muted/30 border-border hover:bg-muted/50'
              }
            `}
          >
            <span className="text-sm font-medium text-foreground">{symptom.name}</span>
            {selectedSymptoms.includes(symptom.id) && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Results */}
      {selectedSymptoms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border pt-4"
        >
          <h4 className="text-sm font-semibold text-foreground mb-3">Related Tests:</h4>
          
          {relatedTests.length > 0 ? (
            <div className="space-y-2">
              {relatedTests.map((test, index) => {
                const isMatched = matchedTests.includes(test);
                return (
                  <div
                    key={index}
                    className={`
                      flex items-center justify-between p-2 rounded-lg
                      ${isMatched ? 'bg-accent/10' : 'bg-muted/30'}
                    `}
                  >
                    <span className="text-sm text-foreground">{test}</span>
                    {isMatched ? (
                      <Badge variant="default" className="bg-accent text-accent-foreground">
                        In Your Report
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Tested</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>No related tests found</span>
            </div>
          )}

          {matchedTests.length > 0 && (
            <div className="mt-4 p-3 bg-accent/10 rounded-lg">
              <p className="text-sm text-foreground">
                ✓ Found <strong>{matchedTests.length}</strong> matching test{matchedTests.length > 1 ? 's' : ''} in your report
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

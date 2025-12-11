import { Stethoscope, Heart, Activity, Brain, Eye, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  icon: any;
  reason: string;
  availability: string;
  location: string;
}

interface DoctorReferralProps {
  recommendedSpecialties: string[];
}

const doctorDatabase: Record<string, Doctor> = {
  'cardiologist': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    icon: Heart,
    reason: 'For cholesterol and heart health concerns',
    availability: 'Available Mon-Fri',
    location: 'City Heart Center',
  },
  'endocrinologist': {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Endocrinologist',
    icon: Activity,
    reason: 'For diabetes and glucose management',
    availability: 'Available Tue-Sat',
    location: 'Diabetes Care Clinic',
  },
  'hematologist': {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Hematologist',
    icon: Stethoscope,
    reason: 'For blood-related conditions and anemia',
    availability: 'Available Mon-Thu',
    location: 'Advanced Blood Institute',
  },
  'neurologist': {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    icon: Brain,
    reason: 'For neurological symptoms',
    availability: 'Available Wed-Sat',
    location: 'Neuro Health Center',
  },
  'general': {
    id: '5',
    name: 'Dr. Amanda Brown',
    specialty: 'General Physician',
    icon: Stethoscope,
    reason: 'For overall health consultation',
    availability: 'Available Daily',
    location: 'Family Health Clinic',
  },
};

export function DoctorReferral({ recommendedSpecialties }: DoctorReferralProps) {
  const doctors = recommendedSpecialties.map(specialty => 
    doctorDatabase[specialty.toLowerCase()] || doctorDatabase['general']
  );

  const handleBookAppointment = (doctor: Doctor) => {
    // Simulate booking
    alert(`Booking appointment with ${doctor.name} (${doctor.specialty})\n\nThis would connect to a real booking system.`);
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border p-6">
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Stethoscope className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">Recommended Doctors</h3>
          <p className="text-sm text-muted-foreground">
            Based on your results, we recommend consulting these specialists
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {doctors.map((doctor) => {
          const IconComponent = doctor.icon;
          return (
            <Card key={doctor.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">{doctor.name}</h4>
                  <p className="text-sm text-primary mb-2">{doctor.specialty}</p>
                  <p className="text-sm text-muted-foreground mb-3">{doctor.reason}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{doctor.availability}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{doctor.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleBookAppointment(doctor)}
                    >
                      <Phone className="w-3 h-3" />
                      Book Appointment
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-card rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Tip:</strong> Bring this report with you to your appointment for faster diagnosis
        </p>
      </div>
    </div>
  );
}

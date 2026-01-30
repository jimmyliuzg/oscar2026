import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { submitRSVP } from '../../services/web3forms';

interface RSVPFormData {
    name: string;
    email: string;
    attending: 'yes' | 'no';
    dietaryRestrictions: string;
    guestCount: number;
}

export default function RSVPForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RSVPFormData>({
        defaultValues: {
            attending: 'yes',
            guestCount: 0,
        },
    });

    const attending = watch('attending');

    const onSubmit = async (data: RSVPFormData) => {
        setIsSubmitting(true);
        setSubmitError('');

        const result = await submitRSVP({
            name: data.name,
            email: data.email,
            attending: data.attending,
            dietaryRestrictions: data.dietaryRestrictions || undefined,
            guestCount: data.guestCount || undefined,
        });

        setIsSubmitting(false);

        if (result.success) {
            setIsSubmitted(true);
        } else {
            setSubmitError(result.message);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-background-elevated rounded-xl p-6 sm:p-8 shadow-lg border border-accent-light text-center"
            >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🎉</span>
                </div>
                <h3 className="font-heading text-2xl text-text mb-2">RSVP Received!</h3>
                <p className="text-text-light">
                    Thank you for responding. We can't wait to see you at the party!
                </p>
            </motion.div>
        );
    }

    return (
        <div className="bg-background-elevated rounded-xl p-6 sm:p-8 shadow-lg border border-accent-light">
            <h3 className="font-heading text-2xl text-text mb-6 text-center">RSVP</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                        Name <span className="text-secondary">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="input"
                        placeholder="Your name"
                    />
                    {errors.name && (
                        <p className="text-secondary text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                        Email <span className="text-secondary">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        className="input"
                        placeholder="your@email.com"
                    />
                    {errors.email && (
                        <p className="text-secondary text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Attending */}
                <div>
                    <label className="block text-sm font-medium text-text mb-3">
                        Will you be attending? <span className="text-secondary">*</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="yes"
                                {...register('attending')}
                                className="w-4 h-4 text-primary accent-primary"
                            />
                            <span className="text-text">Yes, I'll be there! 🎉</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="no"
                                {...register('attending')}
                                className="w-4 h-4 text-primary accent-primary"
                            />
                            <span className="text-text">Can't make it 😢</span>
                        </label>
                    </div>
                </div>

                {/* Conditional fields for attending = yes */}
                {attending === 'yes' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-5"
                    >
                        {/* Guest Count */}
                        <div>
                            <label htmlFor="guestCount" className="block text-sm font-medium text-text mb-1">
                                Additional Guests
                            </label>
                            <input
                                id="guestCount"
                                type="number"
                                min="0"
                                max="5"
                                {...register('guestCount', { min: 0, max: 5 })}
                                className="input w-24"
                                placeholder="0"
                            />
                            <p className="text-text-muted text-xs mt-1">
                                How many people are you bringing? (max 5)
                            </p>
                        </div>

                        {/* Dietary Restrictions */}
                        <div>
                            <label htmlFor="dietary" className="block text-sm font-medium text-text mb-1">
                                Dietary Restrictions / Notes
                            </label>
                            <textarea
                                id="dietary"
                                {...register('dietaryRestrictions')}
                                className="input resize-none"
                                rows={3}
                                placeholder="Any food allergies or preferences?"
                            />
                        </div>
                    </motion.div>
                )}

                {submitError && (
                    <p className="text-secondary text-sm text-center">{submitError}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⏳</span>
                            Submitting...
                        </span>
                    ) : (
                        'Submit RSVP'
                    )}
                </button>
            </form>
        </div>
    );
}

import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

interface DetailItemProps {
    icon: string;
    label: string;
    value: string;
    subValue?: string;
}

function DetailItem({ icon, label, value, subValue }: DetailItemProps) {
    return (
        <motion.div variants={itemVariants} className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{icon}</span>
            </div>
            <div>
                <p className="text-text-light text-sm uppercase tracking-wide">{label}</p>
                <p className="font-heading text-lg text-text">{value}</p>
                {subValue && <p className="text-text-light text-sm">{subValue}</p>}
            </div>
        </motion.div>
    );
}

export default function InviteDetails() {
    return (
        <div className="bg-background-elevated rounded-xl p-6 sm:p-8 shadow-lg border border-accent-light">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <span>✨</span>
                        You're Invited!
                        <span>✨</span>
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl text-text mb-2">
                        2026 Oscars Watch Party
                    </h2>
                    <p className="font-accent text-xl text-text-light italic">
                        An Evening of Cinema Celebration
                    </p>
                </motion.div>

                <div className="space-y-5">
                    <DetailItem
                        icon="📅"
                        label="Date & Time"
                        value="Sunday, March 15, 2026"
                        subValue="6:00 PM - Red Carpet starts at 5:00 PM"
                    />

                    <DetailItem
                        icon="📍"
                        label="Location"
                        value="3506 Hart Cmn"
                        subValue="Fremont, California 94538"
                    />

                    <DetailItem
                        icon="👔"
                        label="Dress Code"
                        value="Smart Casual"
                        subValue="Or inspired by the nominees!"
                    />

                    <DetailItem
                        icon="🍿"
                        label="What to Bring"
                        value="Yourself & Your Appetite"
                        subValue="For Oscar-nominated films and great food"
                    />
                </div>

                <motion.div
                    variants={itemVariants}
                    className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20"
                >
                    <p className="text-text text-center">
                        <span className="font-semibold">🎬 Pro Tip:</span>{' '}
                        <span className="text-text-light">
                            Browse the nominations and fill out your predictions before the party!
                        </span>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

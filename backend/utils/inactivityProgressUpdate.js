export const inactivityProgressUpdate = async (user) => {
    try {
        const userId = user._id;   // ✔ FIXED

        const lastChecked = user.lastProgressChecked;
        const today = new Date();

        const diffDays = Math.floor((today - lastChecked) / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            let newProgress = user.progress - diffDays * 2; // example logic
            if (newProgress < 0) newProgress = 0;

            user.progress = newProgress;
            user.lastProgressChecked = today;
            user.message = `You were inactive for ${diffDays} day(s). Progress decreased by ${diffDays * 2}%.`;

            await user.save();
        }

    } catch (err) {
        console.log("Inactivity update error:", err);
    }
};

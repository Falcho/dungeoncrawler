import { useEffect, useState } from "react";
import persistence from "../utils/localPersistence";

const useHero = () => {
    const HERO_ENDPOINT = "/hero";
    
    const [hero, setHero] = useState(null);

    const fetchHero = () => {
        console.log("Fetching hero...");
        persistence.fetchData(HERO_ENDPOINT)
            .then((data) => {
                console.log("Fetched hero:", data);
                setHero(data);
            })
            .catch((error) => {
                console.error("Error fetching hero:", error);
            });
    };

    const updateHero = (hero) => {
        persistence.saveData(HERO_ENDPOINT, hero)
            .then((data) => {
                setHero(data);
            })
            .catch((error) => {
                console.error("Error updating hero:", error);
            });
    };

    const deleteHeroById = (id) => {
        persistence.deleteData(`${HERO_ENDPOINT}/${id}`)
            .then(() => {
                setHero(null);
            })
            .catch((error) => {
                console.error("Error deleting hero:", error);
            });
    };

    useEffect(() => {
        fetchHero();
    }, []);

    return {
        hero,
        fetchHero,
        updateHero,
        deleteHeroById,
    };
};

export default useHero;
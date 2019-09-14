import {TravelController} from "./components/controllers/travel-controller";
import {getTravel} from "./data";

const travels = new Array(12).fill(``).map(getTravel).sort((a, b) => a.datetime.start - b.datetime.start);

const travelController = new TravelController({travels});
travelController.init();

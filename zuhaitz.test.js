import { sortuSuhaitza } from './zuhaitz.js';

if (typeof sortuSuhaitza("test") === "object") {
    console.info("TEST OK");
} else {
    console.error("TEST KO");
}

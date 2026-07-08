import { WitnessJournal, WitnessJournalEntry } from "./history";

export function appendJournalEntry(
  journal: WitnessJournal,
  entry: WitnessJournalEntry
): WitnessJournal {
  return {
    entries: [...journal.entries, entry],
  };
}
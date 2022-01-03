import { DateData } from "react-native-calendars/src/types";
import Supplement from "./Supplement";
import { WeekDay } from "./WeekDay";

export interface AppProps {
    setDaySelected: (d: string) => void,
    daySelected: string,
    setModalVisible: (j: string) => void,
    modalVisible: string,
    setSupplementMap: (d: Record<string, {SupplementSchedule: {Supplement: Supplement, time: string}[], JournalEntry: string}>) => void,
    supplementMap: Record<string, {SupplementSchedule: {Supplement: Supplement, time: string}[], JournalEntry: string}>,
    setObjDaySelected: (o: DateData) => void,
    objDaySelected: DateData,
    setSelectedDates: (d: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}}) => void,
    selectedDates: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}},
    setShowButtons: (b: boolean) => void,
    showButtons: boolean,
    setIndex: (i: number) => void,
    index: number,
    setPrevIndex: (i: number) => void,
    prevIndex: number
    setJournalText: (j: string) => void,
    journalText: string,
    setWeek: (w: WeekDay[]) => void,
    week: WeekDay[],
    setMonthText: (m: string) => void,
    monthText: string,
    setSwipeAnimation: (s: string) => void,
    swipeAnimation: string,
    setSelectedSupplement: (s: {Supplement: Supplement, time: string}) => void,
    selectedSupplement: {Supplement: Supplement, time: string}
}

import { DateData } from "react-native-calendars/src/types";
import CalendarDotObject from "./Calendar";
import ModalObject from "./Modal";
import { SupplementMapObject, SupplementObject } from "./Supplement";
import { WeekDay } from "./WeekDay";

export interface AppProps {
    setDaySelected: (d: string) => void,
    daySelected: string,
    setModalVisible: (j: ModalObject) => void,
    modalVisible: ModalObject,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
    setObjDaySelected: (o: DateData) => void,
    objDaySelected: DateData,
    setSelectedDates: (d: CalendarDotObject) => void,
    selectedDates: CalendarDotObject,
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
    setSelectedSupplement: (s: SupplementObject) => void,
    selectedSupplement: SupplementObject,
    setMultipleAddMode: (m: boolean) => void,
    multipleAddMode: boolean
}


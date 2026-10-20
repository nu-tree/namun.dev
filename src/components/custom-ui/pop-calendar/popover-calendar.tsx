'use client';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarIcon, ChevronDown, ChevronLeftIcon, ChevronRightIcon, X } from 'lucide-react';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';
import { cn } from '@/lib/utils/utils';
import { Button } from '@/components/ui/button';

type Props = {
  value?: Date | null;
  onSelect?: (date: Date | null) => void;
  placeholder?: string;
  mode?: 'date' | 'month'; // 새로운 mode prop 추가
  isResetable?: boolean; // 리셋 가능 여부
  className?: string;
  canSelectPast?: boolean;
  showTimeInput?: boolean;
};

export const PopoverCalendar = ({
  value,
  onSelect,
  className,
  placeholder,
  mode = 'date',
  isResetable = false,
  canSelectPast = true,
  showTimeInput = false,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isHourOpen, setIsHourOpen] = useState(false);
  const [isMinuteOpen, setIsMinuteOpen] = useState(false);
  const [isPM, setIsPM] = useState(false);
  const today = new Date();
  // 드롭다운 방향 결정을 위한 ref와 state 추가
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const [hourDropdownUp, setHourDropdownUp] = useState(false);
  const [minuteDropdownUp, setMinuteDropdownUp] = useState(false);

  // 드롭다운 방향 계산 함수
  const calculateDropdownDirection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return false;
    const rect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    return spaceBelow < 240;
  };

  useEffect(() => {
    if (!value) return;
    const date = new Date(value);
    setSelectedDate(date);
    date.getHours() >= 12 ? setIsPM(true) : setIsPM(false);
  }, [value]);

  // 오전, 오후 선택 시 시간 업데이트
  useEffect(() => {
    if (!selectedDate) return;
    let hour = selectedDate.getHours();
    if (isPM && hour < 12) {
      hour += 12;
    } else if (!isPM && hour >= 12) {
      hour -= 12;
    }
    handleHourSelect(hour);
  }, [isPM]);

  const handleSelect = (date: Date | null) => {
    if (!date) {
      setSelectedDate(null);
      onSelect?.(null);
      setIsOpen(false);
      return;
    }

    const newDate = new Date(date);
    // 시간이 00:00:00인 경우 (날짜만 선택한 경우) 00:00:00으로 설정
    if (newDate.getHours() === 0 && newDate.getMinutes() === 0 && newDate.getSeconds() === 0) {
      newDate.setHours(0, 0, 0, 0);
    }

    setSelectedDate(newDate);
    onSelect?.(newDate);

    // 날짜 선택시 시간 선택 UI가 없으면 팝오버 닫기
    if (!showTimeInput) {
      setIsOpen(false);
      setPopoverOpen(false);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen); // 드롭다운 열기/닫기

  const handleYearSelect = (year: number) => {
    const updatedDate = new Date(selectedDate || today); // 새로운 Date 객체를 만들어서 수정
    updatedDate.setFullYear(year); // 연도 변경
    setSelectedDate(updatedDate); // 새로운 Date 객체로 상태 업데이트
    onSelect?.(updatedDate); // 변경된 날짜를 부모 컴포넌트로 전달
    setIsOpen(false); // 드롭다운 닫기
  };

  const handleMonthSelect = (month: number) => {
    const updatedDate = new Date(selectedDate || today);
    updatedDate.setMonth(month);
    setSelectedDate(updatedDate);
    onSelect?.(updatedDate);
    setIsMonthOpen(false);
  };

  const handleHourSelect = (hour: number) => {
    const updatedDate = new Date(selectedDate || today);
    updatedDate.setHours(hour);
    setSelectedDate(updatedDate);
    onSelect?.(updatedDate);
  };

  const handleMinuteSelect = (minute: number) => {
    const updatedDate = new Date(selectedDate || today);
    updatedDate.setMinutes(minute);
    setSelectedDate(updatedDate);
    onSelect?.(updatedDate);
  };

  // 월 모드일 때의 날짜 포맷
  const getDateFormat = () => {
    return mode === 'month' ? 'yyyy년 MM월' : showTimeInput ? 'yyyy년 MM월 dd일 aaaa hh시 mm분' : 'yyyy년 MM월 dd일';
  };

  // 월 모드일 때의 placeholder
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    return mode === 'month' ? '월 선택' : '날짜 선택';
  };

  // 월 모드용 커스텀 헤더
  const renderMonthCustomHeader = ({ date, decreaseYear, increaseYear, changeYear }: any) => {
    const currentYear = date.getFullYear();

    return (
      <div className="flex w-full items-center justify-between px-4 py-2">
        <ChevronLeftIcon
          size={20}
          onClick={decreaseYear}
          className="cursor-pointer text-gray-500 hover:text-gray-700"
        />
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            <span>{currentYear}년</span>
          </div>
          {isOpen && (
            <div className="border-input absolute top-full right-0 left-0 z-20 mt-1 max-h-60 overflow-auto rounded-lg border bg-white shadow-lg">
              {(() => {
                const currentYear = today.getFullYear();
                const years = !canSelectPast
                  ? [currentYear, currentYear + 1]
                  : Array.from({ length: currentYear - 2000 + 2 }, (_, i) => 2000 + i).reverse();
                return years.map((year) => (
                  <div
                    key={year}
                    onClick={() => {
                      const newDate = new Date(date);
                      newDate.setFullYear(year);
                      setSelectedDate(newDate);
                      onSelect?.(newDate);
                      changeYear(year);
                      setIsOpen(false);
                    }}
                    className="hover:text-primary hover:bg-primary/5 cursor-pointer px-3 py-2 text-sm"
                  >
                    {year}년
                  </div>
                ));
              })()}
            </div>
          )}
        </div>
        <ChevronRightIcon
          size={20}
          onClick={increaseYear}
          className="cursor-pointer text-gray-500 hover:text-gray-700"
        />
      </div>
    );
  };

  // 날짜 모드용 커스텀 헤더
  const renderDateCustomHeader = ({ date, decreaseMonth, increaseMonth, changeYear, changeMonth }: any) => {
    // 시간 정보를 보존하면서 월을 변경하는 래퍼 함수
    const handleDecreaseMonth = () => {
      if (showTimeInput) {
        // selectedDate가 없으면 현재 캘린더의 date 사용하고 00:00으로 설정
        const baseDate = selectedDate || new Date(date);
        if (!selectedDate) {
          baseDate.setHours(0, 0, 0, 0);
        }
        const updatedDate = new Date(baseDate);
        updatedDate.setMonth(updatedDate.getMonth() - 1);
        setSelectedDate(updatedDate);
        onSelect?.(updatedDate);
      }
      decreaseMonth();
    };

    const handleIncreaseMonth = () => {
      if (showTimeInput) {
        // selectedDate가 없으면 현재 캘린더의 date 사용하고 00:00으로 설정
        const baseDate = selectedDate || new Date(date);
        if (!selectedDate) {
          baseDate.setHours(0, 0, 0, 0);
        }
        const updatedDate = new Date(baseDate);
        updatedDate.setMonth(updatedDate.getMonth() + 1);
        setSelectedDate(updatedDate);
        onSelect?.(updatedDate);
      }
      increaseMonth();
    };

    return (
      <div className="!grid w-[100%] grid-cols-[20px_160px_20px] tracking-normal">
        <ChevronLeftIcon size={20} onClick={handleDecreaseMonth} className="cursor-pointer text-gray-500" />
        <div className="flex items-center justify-center gap-x-1">
          {/* 연도 드롭다운 */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex cursor-pointer items-center justify-center rounded-lg bg-white px-4 py-1 text-[1.1rem] text-gray-800 hover:bg-gray-100"
            >
              <span>{(selectedDate ? new Date(selectedDate) : today).getFullYear()}년</span>
            </div>
            {isOpen && (
              <div className="border-input absolute top-full right-0 left-0 z-10 mt-1 max-h-60 overflow-auto rounded-lg border bg-white shadow-lg">
                {(() => {
                  const currentYear = today.getFullYear();
                  const years = !canSelectPast
                    ? [currentYear, currentYear + 1]
                    : Array.from({ length: currentYear - 2000 + 2 }, (_, i) => 2000 + i).reverse();
                  return years.map((year) => (
                    <div
                      key={year}
                      onClick={() => {
                        handleYearSelect(year);
                        changeYear(year);
                      }}
                      className="hover:text-primary hover:bg-primary/5 cursor-pointer px-3 py-2 text-sm"
                    >
                      {year}년
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
          {/* 월 드롭다운 */}
          <div className="relative">
            <div
              onClick={() => setIsMonthOpen((prev) => !prev)}
              className="flex cursor-pointer items-center justify-center rounded-lg bg-white px-3 py-1 text-[1.1rem] text-gray-800 hover:bg-gray-100"
            >
              <span>{(selectedDate ? new Date(selectedDate) : today).getMonth() + 1}월</span>
            </div>
            {isMonthOpen && (
              <div className="border-input absolute top-full right-0 left-0 z-10 mt-1 max-h-60 min-w-[90px] overflow-auto rounded-lg border bg-white shadow-lg">
                {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                  <div
                    key={month}
                    onClick={() => {
                      handleMonthSelect(month);
                      changeMonth(month);
                    }}
                    className="hover:text-primary hover:bg-primary/5 cursor-pointer px-3 py-2 text-sm"
                  >
                    {month + 1}월
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <ChevronRightIcon size={20} onClick={handleIncreaseMonth} className="flex-1 cursor-pointer text-gray-500" />
      </div>
    );
  };

  // 시간선택용 커스텀 select
  const CustomTimeInput = () => (
    <div className="mt-1 flex gap-x-1">
      <Button size="sm" variant={!isPM ? 'default' : 'outline'} onClick={() => setIsPM(false)}>
        오전
      </Button>
      <Button size="sm" variant={isPM ? 'default' : 'outline'} onClick={() => setIsPM(true)} className="mr-1">
        오후
      </Button>

      {/* hour 선택 */}
      <div className="relative" ref={hourRef}>
        <div
          onClick={() => {
            setHourDropdownUp(calculateDropdownDirection(hourRef));
            setIsHourOpen(!isHourOpen);
          }}
          className="flex h-full cursor-pointer items-center justify-center rounded-lg border bg-white px-2 py-1 text-sm hover:bg-gray-100"
        >
          <span className="flex items-center gap-x-2">
            {(selectedDate ? selectedDate.getHours() % 12 || 12 : 12).toString().padStart(2, '0')}시
            <ChevronDown className="size-4" />
          </span>
        </div>
        {isHourOpen && (
          <div
            className={cn(
              'border-input absolute right-0 left-0 z-10 mt-1 max-h-60 overflow-auto rounded-lg border bg-white shadow-lg',
              hourDropdownUp ? 'bottom-full mb-1' : 'top-full mt-1',
            )}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
              <div
                key={hour}
                onClick={() => {
                  handleHourSelect(isPM ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour);
                  setIsHourOpen(false);
                }}
                className="hover:text-primary hover:bg-primary/5 cursor-pointer px-3 py-2 text-sm"
              >
                {hour.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* minute 선택 */}
      <div className="relative" ref={minuteRef}>
        <div
          onClick={() => {
            setMinuteDropdownUp(calculateDropdownDirection(minuteRef));
            setIsMinuteOpen(!isMinuteOpen);
          }}
          className="flex h-full cursor-pointer items-center justify-center rounded-lg border bg-white px-2 py-1 text-sm hover:bg-gray-100"
        >
          <span className="flex items-center gap-x-2">
            {(selectedDate ? selectedDate.getMinutes() : 0).toString().padStart(2, '0')}분
            <ChevronDown className="size-4" />
          </span>
        </div>
        {isMinuteOpen && (
          <div
            className={cn(
              'border-input absolute right-0 left-0 z-10 mt-1 max-h-60 overflow-auto rounded-lg border bg-white shadow-lg',
              minuteDropdownUp ? 'bottom-full mb-1' : 'top-full mt-1',
            )}
          >
            {Array.from({ length: 6 }, (_, i) => i * 10).map((minute) => (
              <div
                key={minute}
                onClick={() => {
                  handleMinuteSelect(minute);
                  setIsMinuteOpen(false);
                }}
                className="hover:text-primary hover:bg-primary/5 cursor-pointer px-3 py-2 text-sm"
              >
                {minute.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-x-2">
      <div className="relative w-full">
        <DatePicker
          onFocus={(e) => e.target.blur()} // 모바일에서 키보드 안뜨게
          open={popoverOpen}
          onClickOutside={() => {
            setIsOpen(false);
            setIsMonthOpen(false);
            setPopoverOpen(false);
          }}
          selected={selectedDate}
          onChange={handleSelect}
          onInputClick={() => {
            setIsOpen(false);
            setIsMonthOpen(false);
            setPopoverOpen(!popoverOpen);
          }}
          dateFormat={getDateFormat()}
          locale={ko}
          placeholderText={getPlaceholder()}
          className={cn(
            'border-input h-10 w-full cursor-pointer rounded-sm border-1 shadow-xs',
            isResetable && selectedDate ? 'pr-3 pl-9' : 'pl-3',
            className,
          )}
          showTimeInput={showTimeInput}
          timeInputLabel="시간: "
          customTimeInput={<CustomTimeInput />}
          timeCaption="시간"
          minDate={canSelectPast ? undefined : today} // 과거 날짜 선택 불가 설정
          onYearChange={(date) => {
            // 연도 변경 시 기존 시간 정보 유지
            if (selectedDate) {
              const updatedDate = new Date(selectedDate);
              updatedDate.setFullYear(date.getFullYear());
              setSelectedDate(updatedDate);
              onSelect?.(updatedDate);
            } else {
              setSelectedDate(date);
            }
          }}
          onMonthChange={(date) => {
            // 월 변경 시 기존 시간 정보 유지
            if (selectedDate) {
              const updatedDate = new Date(selectedDate);
              updatedDate.setFullYear(date.getFullYear());
              updatedDate.setMonth(date.getMonth());
              setSelectedDate(updatedDate);
              onSelect?.(updatedDate);
            } else {
              setSelectedDate(date);
            }
          }}
          calendarClassName={cn('custom-calendar', mode === 'month' && 'month-picker-calendar')}
          popperClassName="custom-popper"
          shouldCloseOnSelect={mode === 'month'} // 월 모드일 때는 선택 시 닫기
          showMonthYearPicker={mode === 'month'} // 월 모드일 때 월/연도 선택기 활성화
          renderCustomHeader={mode === 'month' ? renderMonthCustomHeader : renderDateCustomHeader}
        />
        {/* 왼쪽 리셋버튼 */}
        {isResetable && selectedDate && (
          <X
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDate(null);
              onSelect?.(null);
            }}
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform cursor-pointer text-gray-400 hover:text-gray-600"
          />
        )}
        <CalendarIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform cursor-pointer opacity-50" />
      </div>
    </div>
  );
};

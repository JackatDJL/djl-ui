import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  type Variants,
  motion,
} from "framer-motion";
import { ArrowLeft } from "react-feather";
import { cn } from ">util/twm";

const TRANSITION = {
  type: "spring",
  bounce: 0.1,
  duration: 0.4,
};

interface FloatingPanelContextType {
  isOpen: boolean;
  openFloatingPanel: (rect: DOMRect) => void;
  closeFloatingPanel: () => void;
  uniqueId: string;
  note: string;
  setNote: (note: string) => void;
  triggerRect: DOMRect | null;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const FloatingPanelContext = createContext<
  FloatingPanelContextType | undefined
>(undefined);

function useFloatingPanel(): FloatingPanelContextType {
  const context = useContext(FloatingPanelContext);
  if (!context) {
    throw new Error("useFloatingPanel must be used within a FloatingPanelRoot");
  }
  return context;
}

function useFloatingPanelLogic() {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openFloatingPanel = (rect: DOMRect) => {
    setTriggerRect(rect);
    setIsOpen(true);
  };
  const closeFloatingPanel = () => {
    setIsOpen(false);
    setNote("");
  };

  return {
    isOpen,
    openFloatingPanel,
    closeFloatingPanel,
    uniqueId,
    note,
    setNote,
    triggerRect,
    title,
    setTitle,
    description,
    setDescription,
  };
}

interface FloatingPanelRootProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelRoot({
  children,
  className,
}: FloatingPanelRootProps) {
  const floatingPanelLogic = useFloatingPanelLogic();

  return (
    <FloatingPanelContext.Provider value={floatingPanelLogic}>
      <MotionConfig transition={TRANSITION}>
        <div className={cn("relative", className)}>{children}</div>
      </MotionConfig>
    </FloatingPanelContext.Provider>
  );
}

interface FloatingPanelTriggerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  description: string;
}

export function FloatingPanelTrigger({
  children,
  className,
  title,
  description,
}: FloatingPanelTriggerProps) {
  const floatingPanelContext = useFloatingPanel();
  const { openFloatingPanel, uniqueId, setTitle, setDescription } =
    floatingPanelContext;
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (triggerRef.current) {
      openFloatingPanel(triggerRef.current.getBoundingClientRect());
    }
    setTitle(title);
    setDescription(description);
  };

  return (
    <motion.button
      aria-expanded={false}
      aria-haspopup="dialog"
      className={cn(
        "flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50",
        className
      )}
      layoutId={`floating-panel-trigger-${uniqueId}`}
      onClick={handleClick}
      ref={triggerRef}
      style={{ borderRadius: 8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex items-center"
        layoutId={`floating-panel-label-container-${uniqueId}`}
      >
        <motion.span
          className="text-sm font-semibold"
          layoutId={`floating-panel-label-${uniqueId}`}
        >
          {children}
        </motion.span>
      </motion.div>
    </motion.button>
  );
}

interface FloatingPanelContentProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelContent({
  children,
  className,
}: FloatingPanelContentProps) {
  const floatingPanelContext = useFloatingPanel();
  const {
    isOpen,
    closeFloatingPanel,
    uniqueId,
    triggerRect,
    title,
    description,
  } = floatingPanelContext;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closeFloatingPanel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFloatingPanel]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFloatingPanel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeFloatingPanel]);

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            animate={{ backdropFilter: "blur(4px)" }}
            className="fixed inset-0 z-40"
            exit={{ backdropFilter: "blur(0px)" }}
            initial={{ backdropFilter: "blur(0px)" }}
          />
          <motion.div
            animate="visible"
            aria-labelledby={`floating-panel-title-${uniqueId}`}
            aria-modal="true"
            className={cn(
              "fixed z-50 overflow-hidden border border-zinc-950/10 bg-white shadow-lg outline-none dark:border-zinc-50/10 dark:bg-zinc-800",
              className
            )}
            exit="hidden"
            initial="hidden"
            layoutId={`floating-panel-${uniqueId}`}
            ref={contentRef}
            role="dialog"
            style={{
              borderRadius: 12,
              left: triggerRect ? triggerRect.left : "50%",
              top: triggerRect ? triggerRect.bottom + 8 : "50%",
              transformOrigin: "top left",
            }}
            variants={variants}
          >
            <FloatingPanelTitle>{title}</FloatingPanelTitle>
            {children}
            <FloatingPanelDescription>{description}</FloatingPanelDescription>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

interface FloatingPanelTitleProps {
  children: React.ReactNode;
}

function FloatingPanelTitle({ children }: FloatingPanelTitleProps) {
  const floatingPanelContext = useFloatingPanel();
  const { uniqueId } = floatingPanelContext;

  return (
    <motion.div
      className="px-4 py-2 bg-white dark:bg-zinc-800"
      layoutId={`floating-panel-label-container-${uniqueId}`}
    >
      <motion.div
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        id={`floating-panel-title-${uniqueId}`}
        layoutId={`floating-panel-label-${uniqueId}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface FloatingPanelDescriptionProps {
  children: React.ReactNode;
}

function FloatingPanelDescription({ children }: FloatingPanelDescriptionProps) {
  const floatingPanelContext = useFloatingPanel();
  const { uniqueId } = floatingPanelContext;

  return (
    <motion.div
      className="px-4 py-2 bg-white dark:bg-zinc-800"
      layoutId={`floating-panel-description-container-${uniqueId}`}
    >
      <motion.div
        className="text-sm text-zinc-900 dark:text-zinc-100"
        id={`floating-panel-description-${uniqueId}`}
        layoutId={`floating-panel-description-${uniqueId}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface FloatingPanelFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
  className?: string;
}

export function FloatingPanelForm({
  children,
  onSubmit,
  className,
}: FloatingPanelFormProps) {
  const { note, closeFloatingPanel } = useFloatingPanel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(note);
    closeFloatingPanel();
  };

  return (
    <form
      className={cn("flex h-full flex-col p-2", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

interface FloatingPanelLabelProps {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}

export function FloatingPanelLabel({
  children,
  htmlFor,
  className,
}: FloatingPanelLabelProps) {
  const { note } = useFloatingPanel();

  return (
    <motion.label
      className={cn(
        "block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100",
        className
      )}
      htmlFor={htmlFor}
      style={{ opacity: note ? 0 : 1 }}
    >
      {children}
    </motion.label>
  );
}

interface FloatingPanelTextareaProps {
  className?: string;
  id?: string;
}

export function FloatingPanelTextarea({
  className,
  id,
}: FloatingPanelTextareaProps) {
  const { note, setNote } = useFloatingPanel();

  return (
    <textarea
      className={cn(
        "h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none",
        className
      )}
      id={id}
      onChange={(e) => {
        setNote(e.target.value);
      }}
      value={note}
    />
  );
}

interface FloatingPanelHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelHeader({
  children,
  className,
}: FloatingPanelHeaderProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-100",
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      transition={{ delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingPanelBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelBody({
  children,
  className,
}: FloatingPanelBodyProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn("p-4", className)}
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingPanelFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingPanelFooter({
  children,
  className,
}: FloatingPanelFooterProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex justify-between px-4 py-3", className)}
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingPanelCloseButtonProps {
  className?: string;
}

export function FloatingPanelCloseButton({
  className,
}: FloatingPanelCloseButtonProps) {
  const { closeFloatingPanel } = useFloatingPanel();

  return (
    <motion.button
      aria-label="Close floating panel"
      className={cn("flex items-center", className)}
      onClick={closeFloatingPanel}
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowLeft className="text-zinc-900 dark:text-zinc-100" size={16} />
    </motion.button>
  );
}

interface FloatingPanelSubmitButtonProps {
  className?: string;
  text?: string;
}

export function FloatingPanelSubmitButton({
  className,
  text = "Submit",
}: FloatingPanelSubmitButtonProps) {
  return (
    <motion.button
      aria-label={text}
      className={cn(
        "relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800",
        className
      )}
      type="submit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.button>
  );
}

interface FloatingPanelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FloatingPanelButton({
  children,
  onClick,
  className,
}: FloatingPanelButtonProps) {
  return (
    <motion.button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700",
        className
      )}
      onClick={onClick}
      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

export {
  FloatingPanelRoot as Root,
  FloatingPanelTrigger as Trigger,
  FloatingPanelContent as Content,
  FloatingPanelForm as Form,
  FloatingPanelLabel as Label,
  FloatingPanelTextarea as Textarea,
  FloatingPanelHeader as Header,
  FloatingPanelBody as Body,
  FloatingPanelFooter as Footer,
  FloatingPanelCloseButton as CloseButton,
  FloatingPanelSubmitButton as SubmitButton,
  FloatingPanelButton as Button,
  FloatingPanelDescription as Description,
};

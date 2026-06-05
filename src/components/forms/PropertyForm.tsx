"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import data from "@emoji-mart/data";
import type { Content, Editor } from "@tiptap/react";
import { Bath, Building2, ImagePlus, Link2, Smile } from "lucide-react";
import { Picker } from "emoji-mart";
import { BottomActionBar } from "./BottomActionBar";
import { FacilityCheckboxGroup } from "./FacilityCheckboxGroup";
import { FormField, RadioGroup, SelectField, TextareaField } from "./FormField";
import { FormSection } from "./FormSection";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";

const propertyOptions = [
  { label: "บ้านเดี่ยว", value: "บ้านเดี่ยว" },
  { label: "วิลล่า", value: "วิลล่า" },
  { label: "คอนโด", value: "คอนโด" },
  { label: "อพาร์ทเม้นท์", value: "อพาร์ทเม้นท์" },
  { label: "ทาวน์เฮ้าส์", value: "ทาวน์เฮ้าส์" },
  { label: "ที่ดิน", value: "ที่ดิน" },
  { label: "ร้านขายของ", value: "ร้านขายของ" },
  { label: "พื้นที่ค้าปลีก", value: "พื้นที่ค้าปลีก" },
  { label: "สำนักงาน", value: "สำนักงาน" },
  { label: "โรงแรม", value: "โรงแรม" },
  { label: "คลังสินค้า", value: "คลังสินค้า" },
];

const bedroomOptions = ["สตูดิโอ", "1 ห้องนอน", "2 ห้องนอน", "3 ห้องนอน", "4 ห้องนอน", "5 ห้องนอนขึ้นไป"];
const provinceOptions = ["กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "สมุทรปราการ", "เชียงใหม่", "ภูเก็ต", "ชลบุรี"];
const districtOptions = ["วัฒนา", "คลองเตย", "ห้วยขวาง", "บางนา", "สาทร", "จตุจักร"];
const subDistrictOptions = ["คลองตันเหนือ", "พระโขนง", "คลองเตยเหนือ", "บางนาเหนือ", "ลุมพินี"];
const directionOptions = ["เหนือ", "ตะวันออกเฉียงเหนือ", "ตะวันออก", "ตะวันออกเฉียงใต้", "ใต้", "ตะวันตกเฉียงใต้", "ตะวันตก", "ตะวันตกเฉียงเหนือ"];

interface PropertyFormProps {
  onBack: () => void;
  onNext: () => void;
}

type EmojiMartEmoji = {
  native?: string;
};

function formatTHB(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function createListingCode() {
  const now = new Date();
  const datePart = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now).replaceAll("-", "");

  return `MBR-${datePart}-0001`;
}

export function PropertyForm({ onBack, onNext }: PropertyFormProps) {
  const [propertyType, setPropertyType] = useState("บ้านเดี่ยว");
  const [bedrooms, setBedrooms] = useState("3 ห้องนอน");
  const [province, setProvince] = useState("กรุงเทพมหานคร");
  const [district, setDistrict] = useState("วัฒนา");
  const [subDistrict, setSubDistrict] = useState("คลองตันเหนือ");
  const [frontDirection, setFrontDirection] = useState("เหนือ");
  const [salePrice, setSalePrice] = useState(5900000);
  const [mapLatLong, setMapLatLong] = useState("13.7563, 100.5018");
  const [contactTime, setContactTime] = useState("9.00-18.00");
  const [additionalDetails, setAdditionalDetails] = useState<Content>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const listingCode = useMemo(() => createListingCode(), []);
  const googleMapSrc = useMemo(
    () => `https://maps.google.com/maps?q=${encodeURIComponent(mapLatLong || "Thailand")}&z=15&output=embed`,
    [mapLatLong]
  );
  const downPayment = salePrice * 0.1;
  const monthlyPayment = useMemo(() => {
    const loanAmount = Math.max(salePrice - downPayment, 0);
    const monthlyRate = 0.04 / 12;
    const totalMonths = 30 * 12;

    return loanAmount > 0
      ? (loanAmount * (monthlyRate * (1 + monthlyRate) ** totalMonths)) / ((1 + monthlyRate) ** totalMonths - 1)
      : 0;
  }, [salePrice, downPayment]);

  const insertEmoji = (emoji: EmojiMartEmoji) => {
    if (!emoji.native) {
      return;
    }

    editorRef.current?.chain().focus().insertContent(emoji.native).run();
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (!showEmojiPicker || !emojiPickerRef.current) {
      return;
    }

    emojiPickerRef.current.innerHTML = "";
    const picker = new Picker({
      data,
      theme: "light",
      set: "native",
      previewPosition: "none",
      skinTonePosition: "none",
      emojiButtonColors: ["#F5F3FF"],
      onEmojiSelect: insertEmoji,
    }) as unknown as HTMLElement;

    emojiPickerRef.current.appendChild(picker);

    return () => {
      picker.remove();
    };
  }, [showEmojiPicker]);

  return (
    <section className="rounded-[16px] border border-[#E5E7EB] bg-white px-5 pt-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[var(--border)] dark:bg-[var(--card)]">
      <div className="mb-5">
        <h1 className="text-[18px] font-semibold text-[#111827]">กรอกข้อมูลขายบ้าน</h1>
        <p className="mt-1 text-[13px] font-normal leading-5 text-[#6B7280]">
          แบบฟอร์มลงทะเบียนข้อมูลเพื่อโพสต์ขายอสังหาริมทรัพย์และสร้างพรอมป์ AI
        </p>
      </div>

      <div className="space-y-5">
        <FormSection title="Basic Listing Information" helper="ข้อมูลหลักของประกาศและช่องทางติดต่อ">
          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#334155]">
              <span>รหัสประกาศ</span>
              <span>{listingCode}</span>
            </div>
            <RadioGroup label="สถานะผู้ประกาศ" options={["เจ้าของ", "นายหน้า"]} />
            <RadioGroup label="คุณต้องการจะขาย หรือ ปล่อยให้เช่า?" options={["ขาย", "ปล่อยเช่า", "ขายและปล่อยเช่า"]} />
            <SelectField
              label="ประเภทของอสังหาฯ ที่คุณต้องการลงประกาศ"
              value={propertyType}
              options={propertyOptions}
              onChange={setPropertyType}
            />
            <FormField
              label="ราคาประกาศ"
              value={salePrice || ""}
              onChange={(value) => setSalePrice(Number(value))}
              placeholder="5900000"
              suffix="บาท"
              type="number"
            />
            <RadioGroup label="ต้องการตั้งราคาแบบให้ส่วนลด" options={["ไม่ต้องการ", "ต้องการ"]} />
            <FormField label="ราคาก่อนลด" placeholder="6500000" suffix="บาท" type="number" />
            <FormField label="ราคาขาย" placeholder="5900000" suffix="บาท" type="number" />
            <RadioGroup label="ต้องการ Agent ช่วยขาย" options={["ไม่ต้องการ", "ต้องการ"]} />
            <SelectField label="ประเภทอสังหาฯ" value={propertyType} options={propertyOptions} onChange={setPropertyType} />
            
           <div className="grid gap-4 ">
          <FormField label="ที่อยู่/ซอย/ถนน" placeholder="ซอยสุขุมวิท 39 ถนนสุขุมวิท" />
        </div>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="จังหวัด" value={province} options={provinceOptions} onChange={setProvince} />
            <SelectField label="อำเภอ/เขต" value={district} options={districtOptions} onChange={setDistrict} />
            <SelectField label="ตำบล/แขวง" value={subDistrict} options={subDistrictOptions} onChange={setSubDistrict} />

            <FormField label="รหัสไปรษณีย์" placeholder="10110" type="number" />
          </div>

            <div className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC]">
              <iframe
                title="Google Map"
                src={googleMapSrc}
                className="h-[260px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="block text-[13px] font-medium text-[#334155]">รายละเอียดเพิ่มเติม</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((current) => !current)}
                    className="theme-focus inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-3 text-[13px] font-semibold text-[#4F46E5] transition hover:bg-[#F5F3FF]"
                  >
                    <Smile className="size-4" />
                    Emoji
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute right-0 top-11 z-20 overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_18px_54px_rgba(15,23,42,0.16)]">
                      <div ref={emojiPickerRef} />
                    </div>
                  )}
                </div>
              </div>
              <MinimalTiptapEditor
                value={additionalDetails}
                onChange={setAdditionalDetails}
                onEditorReady={(editor) => {
                  editorRef.current = editor;
                }}
                output="html"
                placeholder="ใส่รายละเอียดเพิ่มเติม เช่น จุดเด่นของบ้าน เงื่อนไขการขาย สิ่งที่รวมในราคา หรือข้อมูลที่ผู้ซื้อควรรู้"
                className="rounded-[12px] border-[#E5E7EB] shadow-none"
                editorContentClassName="min-h-[180px] p-4 text-[14px] leading-6"
                editorClassName="focus:outline-none"
              />
            </div>
            <SelectField label="หันหน้าทิศ" value={frontDirection} options={directionOptions} onChange={setFrontDirection} />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="ชื่อผู้ติดต่อ" placeholder="คุณสมชาย" />
              <FormField label="เบอร์โทร" placeholder="081-234-5678" />
              <FormField label="Line ID" placeholder="@proppilot" />
              <FormField label="อีเมล" placeholder="contact@example.com" type="email" />
            </div>
          </div>
        </FormSection>

        <FormSection title="รายละเอียดห้องและพื้นที่" helper="รายละเอียดพื้นที่ ห้อง และจำนวนที่จอดรถ" compact>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="ขนาดที่ดิน" placeholder="80" suffix="ตร.ว." type="number" />
            <FormField label="พื้นที่ใช้สอย" placeholder="240" suffix="ตร.ม." type="number" />
            <FormField label="จำนวนชั้นทั้งหมด" placeholder="2" type="number" />
            <SelectField label="จำนวนห้องนอน" value={bedrooms} options={bedroomOptions} onChange={setBedrooms} />
            <FormField label="จำนวนห้องน้ำ" placeholder="3" suffix="ห้อง" type="number" icon={Bath} />
            <FormField label="ที่จอดรถ" placeholder="2" suffix="คัน" type="number" icon={Building2} />
          </div>
        </FormSection>

        

        <FormSection title="การตกแต่งและสิ่งอำนวยความสะดวก" helper="รายละเอียดเฟอร์นิเจอร์และสิ่งอำนวยความสะดวก">
          <div className="space-y-4">
            <RadioGroup label="ลักษณะการตกแต่ง" options={["ห้องเปล่า", "ตกแต่งบางส่วน", "Fully Furnished"]} />
            <FacilityCheckboxGroup
              label="สิ่งอำนวยความสะดวกในห้อง"
              options={["เครื่องปรับอากาศ", "อ่างอาบน้ำ", "เครื่องดูดควัน", "ห้องมุม", "Walk-in Closet"]}
            />
            <FacilityCheckboxGroup
              label="สิ่งอำนวยความสะดวกส่วนกลาง"
              options={["รปภ. 24 ชม./CCTV", "สระว่ายน้ำ", "ฟิตเนส", "ซาวน่า", "ที่จอดรถโครงการ"]}
            />
          </div>
        </FormSection>



        <FormSection title="Upload รูปภาพ และวิดีโอ" helper="รายละเอียดประกาศ รูปภาพ และวิดีโอ">
          <div className="grid gap-4">

            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#334155]">อัปโหลดรูปภาพ</span>
              <span className="flex h-10 cursor-pointer items-center justify-between rounded-[11px] border border-dashed border-[#D1D5DB] bg-white px-3 text-[13px] font-medium text-[#6366F1] hover:bg-[#F8FAFC]">
                <span>รองรับหลายไฟล์ JPG, PNG</span>
                <ImagePlus className="size-4" />
                <input type="file" multiple className="sr-only" />
              </span>
            </label>
            <FormField label="วิดีโอ/ลิงก์ YouTube" placeholder="https://youtube.com/..." icon={Link2} />
          </div>
        </FormSection>
      </div>

      <BottomActionBar backLabel="ยกเลิก" nextLabel="บันทึก" onBack={onBack} onNext={onNext} />
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { StaticImageData } from 'next/image';

import {
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  Clock3,
  Facebook,
  Flag,
  Globe2,
  Heart,
  Image as ImageIcon,
  Instagram,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  Send,
  Share2,
  Smile,
  Sparkles,
  ThumbsUp,
  UserRound,
  Users,
  Video,
  X,
  Youtube,
} from 'lucide-react';

import { Sidebar, StepBar, TopNav } from '@/app/post/page';
import facebookLogo from '@/images/facebook-circle.svg';
import instagramLogo from '@/images/instagram-circle.svg';
import previewGif from '@/images/Preview.gif';
import tiktokLogo from '@/images/tiktok-circle.svg';
import twitterLogo from '@/images/twitter-circle.svg';
import vdoCover from '@/images/vdo-cover.png';
import youtubeLogo from '@/images/youtube-circle.svg';

type PlatformName = 'Facebook' | 'Instagram' | 'X (Twitter)' | 'TikTok' | 'YouTube';
type FacebookDestination = 'Profile' | 'Page' | 'Location' | 'Group';
type ScheduleMode = 'now' | 'scheduled';

type FacebookPageTarget = {
  id: string;
  name: string;
  category?: string;
  tasks?: string[];
};

type PlatformSchedule = {
  mode: ScheduleMode;
  timezone: string;
  date: string;
  time: string;
  draftSaved: boolean;
};

type PublishState = 'idle' | 'posting' | 'success' | 'error';

type PlatformPublishStatus = {
  state: PublishState;
  message?: string;
};

type PlatformConfig = {
  name: PlatformName;
  icon: typeof Facebook;
  logo: StaticImageData;
  color: string;
  maxLength: number;
};

const platforms: PlatformConfig[] = [
  { name: 'Facebook', icon: Facebook, logo: facebookLogo, color: 'text-[#1877F2]', maxLength: 2000 },
  { name: 'Instagram', icon: Instagram, logo: instagramLogo, color: 'text-[#E4405F]', maxLength: 2200 },
  { name: 'TikTok', icon: Video, logo: tiktokLogo, color: 'text-[#111827]', maxLength: 2200 },
  { name: 'YouTube', icon: Youtube, logo: youtubeLogo, color: 'text-[#FF0000]', maxLength: 5000 },
  { name: 'X (Twitter)', icon: X, logo: twitterLogo, color: 'text-[#111827]', maxLength: 280 },
];

const postCopy = 'บ้านเดี่ยวสไตล์ใหม่ พร้อมอยู่ ใกล้ MRT รามอินทรา กม.9 นัดชมบ้านวันนี้ รับข้อเสนอพิเศษ ✨';

const initialPostCopies = Object.fromEntries(platforms.map((platform) => [platform.name, postCopy])) as Record<PlatformName, string>;
const initialActivePlatforms = Object.fromEntries(platforms.map((platform) => [platform.name, false])) as Record<PlatformName, boolean>;
const initialSelectedPlatforms = Object.fromEntries(platforms.map((platform) => [platform.name, true])) as Record<PlatformName, boolean>;

const postTags = ['#บ้านเดี่ยว', '#รามอินทรา', '#ใกล้MRT', '#พร้อมอยู่', '#บ้านสวย'];

const initialPostMedia = Object.fromEntries(platforms.map((platform) => [platform.name, [vdoCover.src, previewGif.src, vdoCover.src]])) as Record<PlatformName, string[]>;
const initialPostTags = Object.fromEntries(platforms.map((platform) => [platform.name, postTags.slice(0, platform.name === 'Instagram' ? 5 : 4)])) as Record<PlatformName, string[]>;
const initialPostSchedules = Object.fromEntries(
  platforms.map((platform) => [
    platform.name,
    {
      mode: 'now',
      timezone: '(GMT+7) Bangkok',
      date: '2025-05-26',
      time: '10:00',
      draftSaved: false,
    },
  ]),
) as Record<PlatformName, PlatformSchedule>;
const initialPublishStatuses = Object.fromEntries(platforms.map((platform) => [platform.name, { state: 'idle' }])) as Record<PlatformName, PlatformPublishStatus>;

const socialMediaPostSpecs: Record<PlatformName, { size: string; aspectRatio: string; image: 'preview' | 'cover' }> = {
  Facebook: { size: '1200 x 630 px', aspectRatio: '1200 / 630', image: 'preview' },
  Instagram: { size: '1080 x 1350 px', aspectRatio: '1080 / 1350', image: 'cover' },
  'X (Twitter)': { size: '1600 x 900 px', aspectRatio: '1600 / 900', image: 'preview' },
  TikTok: { size: '1080 x 1920 px', aspectRatio: '1080 / 1920', image: 'cover' },
  YouTube: { size: '1920 x 1080 px', aspectRatio: '1920 / 1080', image: 'cover' },
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function getPlatform(name: PlatformName) {
  return platforms.find((platform) => platform.name === name) ?? platforms[0];
}

export default function PostStep4Page() {
  const [selectedPlatformName, setSelectedPlatformName] = useState<PlatformName>('Facebook');
  const [expandedPlatformName, setExpandedPlatformName] = useState<PlatformName>('Facebook');
  const [postCopies, setPostCopies] = useState<Record<PlatformName, string>>(initialPostCopies);
  const [activePlatforms, setActivePlatforms] = useState<Record<PlatformName, boolean>>(initialActivePlatforms);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<PlatformName, boolean>>(initialSelectedPlatforms);
  const [facebookConnectOpen, setFacebookConnectOpen] = useState(false);
  const [facebookDestination, setFacebookDestination] = useState<FacebookDestination | null>(null);
  const [selectedFacebookPage, setSelectedFacebookPage] = useState<FacebookPageTarget | null>(null);
  const [postTagsByPlatform, setPostTagsByPlatform] = useState<Record<PlatformName, string[]>>(initialPostTags);
  const [postMediaByPlatform, setPostMediaByPlatform] = useState<Record<PlatformName, string[]>>(initialPostMedia);
  const [postSchedulesByPlatform, setPostSchedulesByPlatform] = useState<Record<PlatformName, PlatformSchedule>>(initialPostSchedules);
  const [publishStatusesByPlatform, setPublishStatusesByPlatform] = useState<Record<PlatformName, PlatformPublishStatus>>(initialPublishStatuses);

  const handlePostCopyChange = (platformName: PlatformName, copy: string) => {
    setPostCopies((current) => ({ ...current, [platformName]: copy }));
    setSelectedPlatformName(platformName);
  };

  const handleSelectPlatform = (platformName: PlatformName) => {
    setSelectedPlatformName(platformName);
    setExpandedPlatformName(platformName);
  };

  const togglePlatform = (platformName: PlatformName) => {
    if (activePlatforms[platformName]) {
      setActivePlatforms((current) => ({ ...current, [platformName]: false }));
      return;
    }

    if (platformName === 'Facebook' && !facebookDestination) {
      setFacebookConnectOpen(true);
      return;
    }

    setActivePlatforms((current) => ({ ...current, [platformName]: true }));
  };

  const toggleSelectedPlatform = (platformName: PlatformName) => {
    const next = { ...selectedPlatforms, [platformName]: !selectedPlatforms[platformName] };
    setSelectedPlatforms(next);

    if (!next[platformName] && selectedPlatformName === platformName) {
      const fallback = platforms.find((platform) => next[platform.name]);
      if (fallback) {
        setSelectedPlatformName(fallback.name);
        setExpandedPlatformName(fallback.name);
      }
    }
  };

  const setAllPlatformsSelected = (selected: boolean) => {
    setSelectedPlatforms(Object.fromEntries(platforms.map((platform) => [platform.name, selected])) as Record<PlatformName, boolean>);
    if (selected) {
      setSelectedPlatformName('Facebook');
      setExpandedPlatformName('Facebook');
    }
  };

  const handleFacebookConnect = (destination: FacebookDestination, page?: FacebookPageTarget) => {
    setFacebookDestination(destination);
    setSelectedFacebookPage(page ?? null);
    setActivePlatforms((current) => ({ ...current, Facebook: true }));
    setSelectedPlatformName('Facebook');
    setExpandedPlatformName('Facebook');
    setFacebookConnectOpen(false);
  };

  const addTag = (platformName: PlatformName, tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    const nextTag = trimmedTag.startsWith('#') ? trimmedTag : `#${trimmedTag}`;
    setPostTagsByPlatform((current) => {
      if (current[platformName].includes(nextTag)) return current;
      return { ...current, [platformName]: [...current[platformName], nextTag] };
    });
  };

  const removeTag = (platformName: PlatformName, tag: string) => {
    setPostTagsByPlatform((current) => ({ ...current, [platformName]: current[platformName].filter((item) => item !== tag) }));
  };

  const addMedia = (platformName: PlatformName, files: FileList | null) => {
    if (!files?.length) return;
    const mediaUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPostMediaByPlatform((current) => ({ ...current, [platformName]: [...current[platformName], ...mediaUrls].slice(0, 8) }));
  };

  const removeMedia = (platformName: PlatformName, index: number) => {
    setPostMediaByPlatform((current) => ({ ...current, [platformName]: current[platformName].filter((_, mediaIndex) => mediaIndex !== index) }));
  };

  const updateSchedule = (platformName: PlatformName, schedule: Partial<PlatformSchedule>) => {
    setPostSchedulesByPlatform((current) => ({
      ...current,
      [platformName]: {
        ...current[platformName],
        ...schedule,
      },
    }));
  };

  const publishPostNow = async (platformName: PlatformName) => {
    if (platformName !== 'Facebook') {
      setPublishStatusesByPlatform((current) => ({
        ...current,
        [platformName]: { state: 'error', message: `${platformName} publishing is not connected yet.` },
      }));
      return;
    }

    if (!activePlatforms.Facebook || !selectedFacebookPage) {
      setPublishStatusesByPlatform((current) => ({
        ...current,
        Facebook: { state: 'error', message: 'Please connect and select a Facebook Page before publishing.' },
      }));
      return;
    }

    const message = [postCopies.Facebook, postTagsByPlatform.Facebook.join(' ')].filter(Boolean).join('\n\n');
    setPublishStatusesByPlatform((current) => ({ ...current, Facebook: { state: 'posting', message: 'Posting to Facebook Page...' } }));

    try {
      const response = await fetch('/api/auth/facebook/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          pageId: selectedFacebookPage.id,
          imageUrl: postMediaByPlatform.Facebook[0],
        }),
      });
      const payload = (await response.json()) as { success?: boolean; post?: { id?: string }; error?: string };

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Facebook publish failed.');
      }

      setPublishStatusesByPlatform((current) => ({
        ...current,
        Facebook: { state: 'success', message: `Posted to Facebook successfully${payload.post?.id ? `: ${payload.post.id}` : '.'}` },
      }));
    } catch (error) {
      setPublishStatusesByPlatform((current) => ({
        ...current,
        Facebook: { state: 'error', message: error instanceof Error ? error.message : 'Facebook publish failed.' },
      }));
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F8FC] text-[#0F172A]">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav />
          <div className="mx-auto w-full max-w-[1540px] flex-1 px-4 py-4 lg:px-6">
            <StepBar activeStep={4} />
            <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(500px,0.82fr)_minmax(620px,1fr)] xl:items-start">
              <ComposePanel
                selectedPlatformName={selectedPlatformName}
                expandedPlatformName={expandedPlatformName}
                postCopies={postCopies}
                activePlatforms={activePlatforms}
                selectedPlatforms={selectedPlatforms}
                postTagsByPlatform={postTagsByPlatform}
                postMediaByPlatform={postMediaByPlatform}
                postSchedulesByPlatform={postSchedulesByPlatform}
                publishStatusesByPlatform={publishStatusesByPlatform}
                selectedFacebookPage={selectedFacebookPage}
                onCopyChange={handlePostCopyChange}
                onSelectPlatform={handleSelectPlatform}
                onExpandPlatform={setExpandedPlatformName}
                onTogglePlatform={togglePlatform}
                onToggleSelectedPlatform={toggleSelectedPlatform}
                onSetAllPlatformsSelected={setAllPlatformsSelected}
                onAddTag={addTag}
                onRemoveTag={removeTag}
                onAddMedia={addMedia}
                onRemoveMedia={removeMedia}
                onUpdateSchedule={updateSchedule}
                onPublishNow={publishPostNow}
              />
              <PreviewPanel selectedPlatformName={selectedPlatformName} postCopy={postCopies[selectedPlatformName]} media={postMediaByPlatform[selectedPlatformName]} selectedFacebookPage={selectedFacebookPage} onSelectPlatform={handleSelectPlatform} />
            </div>
          </div>
        </div>
      </div>
      <FacebookConnectModal open={facebookConnectOpen} onClose={() => setFacebookConnectOpen(false)} onConnect={handleFacebookConnect} />
    </main>
  );
}

function ComposePanel({
  selectedPlatformName,
  expandedPlatformName,
  postCopies,
  activePlatforms,
  selectedPlatforms,
  postTagsByPlatform,
  postMediaByPlatform,
  postSchedulesByPlatform,
  publishStatusesByPlatform,
  selectedFacebookPage,
  onCopyChange,
  onSelectPlatform,
  onExpandPlatform,
  onTogglePlatform,
  onToggleSelectedPlatform,
  onSetAllPlatformsSelected,
  onAddTag,
  onRemoveTag,
  onAddMedia,
  onRemoveMedia,
  onUpdateSchedule,
  onPublishNow,
}: {
  selectedPlatformName: PlatformName;
  expandedPlatformName: PlatformName;
  postCopies: Record<PlatformName, string>;
  activePlatforms: Record<PlatformName, boolean>;
  selectedPlatforms: Record<PlatformName, boolean>;
  postTagsByPlatform: Record<PlatformName, string[]>;
  postMediaByPlatform: Record<PlatformName, string[]>;
  postSchedulesByPlatform: Record<PlatformName, PlatformSchedule>;
  publishStatusesByPlatform: Record<PlatformName, PlatformPublishStatus>;
  selectedFacebookPage: FacebookPageTarget | null;
  onCopyChange: (platformName: PlatformName, copy: string) => void;
  onSelectPlatform: (platformName: PlatformName) => void;
  onExpandPlatform: (platformName: PlatformName) => void;
  onTogglePlatform: (platformName: PlatformName) => void;
  onToggleSelectedPlatform: (platformName: PlatformName) => void;
  onSetAllPlatformsSelected: (selected: boolean) => void;
  onAddTag: (platformName: PlatformName, tag: string) => void;
  onRemoveTag: (platformName: PlatformName, tag: string) => void;
  onAddMedia: (platformName: PlatformName, files: FileList | null) => void;
  onRemoveMedia: (platformName: PlatformName, index: number) => void;
  onUpdateSchedule: (platformName: PlatformName, schedule: Partial<PlatformSchedule>) => void;
  onPublishNow: (platformName: PlatformName) => void;
}) {
  const [platformMenuOpen, setPlatformMenuOpen] = useState(false);
  const platformMenuRef = useRef<HTMLDivElement | null>(null);
  const selectedCount = platforms.filter((platform) => selectedPlatforms[platform.name]).length;
  const allPlatformsSelected = selectedCount === platforms.length;
  const visiblePlatforms = platforms.filter((platform) => selectedPlatforms[platform.name]);

  useEffect(() => {
    if (!platformMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!platformMenuRef.current?.contains(event.target as Node)) {
        setPlatformMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [platformMenuOpen]);

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white shadow-[0_8px_26px_rgba(15,23,42,0.04)]">
      <div className="border-b border-[#E2E8F0] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[16px] font-bold text-[#0F172A]">เลือกแพลตฟอร์ม</h2>
          <div ref={platformMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setPlatformMenuOpen((open) => !open)}
              aria-expanded={platformMenuOpen}
              className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#D8DEE9] bg-white px-3 text-[12px] font-semibold text-[#64748B] transition hover:border-[#B9C5FF]"
            >
              เลือกแพลตฟอร์มทั้งหมด
              <ChevronDown className={cx('size-4 transition', platformMenuOpen && 'rotate-180')} />
            </button>
            {platformMenuOpen ? (
              <div className="absolute right-0 top-11 z-30 w-[240px] overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.14)]">
                <div className="border-b border-[#EEF2F7] px-3 py-2 text-[12px] font-semibold text-[#64748B]">{selectedCount} / {platforms.length} active</div>
                <button type="button" onClick={() => onSetAllPlatformsSelected(!allPlatformsSelected)} className="flex h-11 w-full items-center gap-2 px-3 text-left text-[13px] font-semibold text-[#0F172A] hover:bg-[#F8FAFC]">
                  <span className={cx('grid size-5 place-items-center rounded-[5px] border', allPlatformsSelected ? 'border-[#6C63FF] bg-[#6C63FF] text-white' : 'border-[#CBD5E1] text-transparent')}>
                    <Check className="size-3.5" />
                  </span>
                  เลือกทั้งหมด
                </button>
                <div className="border-t border-[#EEF2F7] py-1">
                  {platforms.map((platform) => {
                    const selected = selectedPlatforms[platform.name];
                    return (
                      <button key={`menu-${platform.name}`} type="button" onClick={() => onToggleSelectedPlatform(platform.name)} className="flex h-10 w-full items-center gap-2 px-3 text-left text-[13px] font-semibold text-[#334155] hover:bg-[#F8FAFC]">
                        <span className={cx('grid size-5 place-items-center rounded-[5px] border', selected ? 'border-[#6C63FF] bg-[#6C63FF] text-white' : 'border-[#CBD5E1] text-transparent')}>
                          <Check className="size-3.5" />
                        </span>
                        <img src={platform.logo.src} alt="" aria-hidden="true" className="size-4 shrink-0" />
                        {platform.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#E2E8F0]">
        {visiblePlatforms.map((platform) => (
          <PlatformComposer
            key={platform.name}
            platform={platform}
            copy={postCopies[platform.name]}
            active={activePlatforms[platform.name]}
            tags={postTagsByPlatform[platform.name]}
            media={postMediaByPlatform[platform.name]}
            schedule={postSchedulesByPlatform[platform.name]}
            publishStatus={publishStatusesByPlatform[platform.name]}
            selectedFacebookPage={platform.name === 'Facebook' ? selectedFacebookPage : null}
            expanded={expandedPlatformName === platform.name}
            selected={selectedPlatformName === platform.name}
            onCopyChange={(copy) => onCopyChange(platform.name, copy)}
            onSelect={() => onSelectPlatform(platform.name)}
            onToggleExpand={() => onExpandPlatform(platform.name)}
            onToggleActive={() => onTogglePlatform(platform.name)}
            onAddTag={(tag) => onAddTag(platform.name, tag)}
            onRemoveTag={(tag) => onRemoveTag(platform.name, tag)}
            onAddMedia={(files) => onAddMedia(platform.name, files)}
            onRemoveMedia={(index) => onRemoveMedia(platform.name, index)}
            onUpdateSchedule={(schedule) => onUpdateSchedule(platform.name, schedule)}
            onPublishNow={() => onPublishNow(platform.name)}
          />
        ))}
      </div>
    </section>
  );
}

function PlatformComposer({
  platform,
  copy,
  active,
  tags,
  media,
  schedule,
  publishStatus,
  selectedFacebookPage,
  expanded,
  selected,
  onCopyChange,
  onSelect,
  onToggleExpand,
  onToggleActive,
  onAddTag,
  onRemoveTag,
  onAddMedia,
  onRemoveMedia,
  onUpdateSchedule,
  onPublishNow,
}: {
  platform: PlatformConfig;
  copy: string;
  active: boolean;
  tags: string[];
  media: string[];
  schedule: PlatformSchedule;
  publishStatus: PlatformPublishStatus;
  selectedFacebookPage: FacebookPageTarget | null;
  expanded: boolean;
  selected: boolean;
  onCopyChange: (copy: string) => void;
  onSelect: () => void;
  onToggleExpand: () => void;
  onToggleActive: () => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddMedia: (files: FileList | null) => void;
  onRemoveMedia: (index: number) => void;
  onUpdateSchedule: (schedule: Partial<PlatformSchedule>) => void;
  onPublishNow: () => void;
}) {
  const [tagDraft, setTagDraft] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    onAddTag(tagDraft);
    setTagDraft('');
  };

  const handleMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAddMedia(event.target.files);
    event.target.value = '';
  };

  return (
    <article className={cx('bg-white transition', selected && 'bg-[#FBFAFF]')}>
      <div className="flex w-full items-center gap-3 px-5 py-4 text-left">
        <img src={platform.logo.src} alt="" aria-hidden="true" className="size-6 shrink-0" />
        <button type="button" onClick={onSelect} className="min-w-0 flex-1 truncate text-left text-[15px] font-bold text-[#0F172A]">
          {platform.name}
        </button>
        <button
          type="button"
          onClick={onToggleActive}
          aria-label={`${active ? 'Disable' : 'Enable'} ${platform.name}`}
          className={cx('relative h-5 w-9 rounded-full transition', active ? 'bg-[#51C66B]' : 'bg-[#CBD5E1]')}
        >
          <span className={cx('absolute top-0.5 size-4 rounded-full bg-white transition', active ? 'left-[18px]' : 'left-0.5')} />
        </button>
        <button
          type="button"
          onClick={onToggleExpand}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${platform.name}`}
          className="grid size-8 place-items-center rounded-[8px] text-[#334155] hover:bg-[#F8FAFC]"
        >
          <ChevronDown className={cx('size-4 transition', expanded && 'rotate-180')} />
        </button>
      </div>

      {expanded ? (
        <div className="space-y-4 px-5 pb-5">
          {!active ? (
            <div className="rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-4 text-[13px] font-semibold text-[#64748B]">
              เปิดการเชื่อมต่อ {platform.name} เพื่อกรอกข้อมูลสำหรับโพสต์นี้
            </div>
          ) : (
            <>
          {platform.name === 'Facebook' && selectedFacebookPage ? (
            <div className="rounded-[10px] border border-[#D8DEE9] bg-white px-3 py-2 text-[12px] font-semibold text-[#334155]">
              Page เป้าหมาย: <span className="font-bold text-[#4F46E5]">{selectedFacebookPage.name}</span>
              <span className="ml-2 text-[#94A3B8]">ID: {selectedFacebookPage.id}</span>
            </div>
          ) : null}
          <label className="block">
            <span className="mb-2 block text-[12px] font-bold text-[#334155]">{platform.name === 'Facebook' ? 'ข้อความสำหรับโพสต์' : 'คำบรรยาย'}</span>
            <textarea
              value={copy}
              onChange={(event) => onCopyChange(event.target.value)}
              className="min-h-[64px] w-full resize-none rounded-[10px] border border-[#D8DEE9] bg-white px-3 py-3 text-[13px] font-medium leading-6 text-[#0F172A] outline-none transition focus:border-[#8B7BFF] focus:ring-4 focus:ring-[#7B61FF]/10"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#64748B]">
                <Smile className="size-4" />
                <ImageIcon className="size-4" />
                <Video className="size-4" />
                <MapPin className="size-4" />
                <Paperclip className="size-4" />
                <Sparkles className="size-4 text-[#6C63FF]" />
              </div>
              <span className="text-[11px] font-semibold text-[#64748B]">{copy.length} / {platform.maxLength.toLocaleString('en-US')}</span>
            </div>
          </label>

          <div>
            <p className="mb-2 text-[12px] font-bold text-[#334155]">{platform.name === 'Facebook' ? 'แท็ก (แฮชแท็กหรือคำสำคัญ)' : 'แท็ก'}</p>
            <div className="flex min-h-[52px] flex-wrap items-center gap-2 rounded-[10px] border border-[#D8DEE9] bg-white px-3 py-2">
              {tags.map((tag) => (
                <span key={`${platform.name}-${tag}`} className="inline-flex h-7 items-center gap-1 rounded-[7px] bg-[#F0EDFF] px-2.5 text-[12px] font-semibold text-[#334155]">
                  {tag}
                  <button type="button" onClick={() => onRemoveTag(tag)} aria-label={`Remove ${tag}`}>
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <input
                value={tagDraft}
                onChange={(event) => setTagDraft(event.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => {
                  onAddTag(tagDraft);
                  setTagDraft('');
                }}
                placeholder="เพิ่มแท็ก..."
                className="h-7 min-w-[96px] flex-1 bg-transparent text-[12px] font-medium text-[#334155] outline-none placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-[12px] font-bold text-[#334155]">รูปภาพ / วิดีโอ</p>
            <div className="grid grid-cols-4 gap-3">
              {media.map((image, index) => (
                <div key={`${platform.name}-${image}-${index}`} className="relative aspect-[16/9] overflow-hidden rounded-[8px] border border-[#D8DEE9] bg-[#F8FAFC]">
                  <img src={image} alt={`${platform.name} media ${index + 1}`} className="h-full w-full object-cover" />
                  <button type="button" onClick={() => onRemoveMedia(index)} aria-label="Remove media" className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-white text-[#334155] shadow-sm">
                    <X className="size-3" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => fileInputRef.current?.click()} className="flex aspect-[16/9] flex-col items-center justify-center rounded-[8px] border border-dashed border-[#8B7BFF] bg-[#FBFAFF] text-[#5B5DF6] transition hover:bg-[#F5F3FF]">
                <Plus className="size-5" />
                <span className="mt-1 text-[11px] font-bold">เพิ่มรูป</span>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple className="sr-only" onChange={handleMediaChange} />
            </div>
          </div>

          <SchedulePanel schedule={schedule} publishStatus={publishStatus} onChange={onUpdateSchedule} onPublishNow={onPublishNow} />
            </>
          )}
        </div>
      ) : null}
    </article>
  );
}

function FacebookConnectModal({
  open,
  onClose,
  onConnect,
}: {
  open: boolean;
  onClose: () => void;
  onConnect: (destination: FacebookDestination, page?: FacebookPageTarget) => void;
}) {
  const [view, setView] = useState<'destinations' | 'pages'>('destinations');
  const [pages, setPages] = useState<FacebookPageTarget[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [pagesError, setPagesError] = useState<string | null>(null);

  const options: Array<{
    name: FacebookDestination;
    note?: string;
    icon: typeof UserRound;
    className: string;
  }> = [
    { name: 'Profile', note: '(via reminders)', icon: UserRound, className: 'bg-[#2D8CFF]' },
    { name: 'Page', icon: Flag, className: 'bg-[#FF8A24]' },
    { name: 'Location', icon: MapPin, className: 'bg-[#EF3D58]' },
    { name: 'Group', note: '(via reminders)', icon: Users, className: 'bg-[#2D8CFF]' },
  ];

  useEffect(() => {
    if (!open) return;
    setView('destinations');
    setPagesError(null);
  }, [open]);

  const loadFacebookPages = async () => {
    setPagesLoading(true);
    setPagesError(null);
    setView('pages');

    try {
      const response = await fetch('/api/auth/facebook/pages', { cache: 'no-store' });
      const payload = (await response.json()) as { data?: FacebookPageTarget[]; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to load Facebook Pages.');
      }

      setPages(payload.data || []);
    } catch (error) {
      setPages([]);
      setPagesError(error instanceof Error ? error.message : 'Unable to load Facebook Pages.');
    } finally {
      setPagesLoading(false);
    }
  };

  const handleDestinationClick = (destination: FacebookDestination) => {
    if (destination === 'Page') {
      void loadFacebookPages();
      return;
    }

    onConnect(destination);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/35 px-4 py-6">
      <section className="w-full max-w-[860px] rounded-[14px] bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.24)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={facebookLogo.src} alt="" aria-hidden="true" className="size-10 shrink-0" />
            <h2 className="text-[20px] font-bold text-[#11143A]">Facebook</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close Facebook integration" className="grid size-9 place-items-center rounded-[8px] text-[#11143A] transition hover:bg-[#F8FAFC]">
            <X className="size-5" />
          </button>
        </div>

        <div className="my-7 h-px bg-[#E2E8F0]" />

        {view === 'destinations' ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {options.map((option) => {
              const OptionIcon = option.icon;
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleDestinationClick(option.name)}
                  className="flex min-h-[158px] flex-col items-center justify-center rounded-[8px] border border-[#D8DEE9] bg-white px-4 text-center transition hover:border-[#B9C5FF] hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                >
                  <span className={cx('grid size-10 place-items-center rounded-full text-white', option.className)}>
                    <OptionIcon className="size-6" />
                  </span>
                  <span className="mt-4 text-[18px] font-bold text-[#575A7A]">{option.name}</span>
                  {option.note ? <span className="mt-0.5 text-[12px] font-bold text-[#575A7A]">{option.note}</span> : null}
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setView('destinations')} className="text-[13px] font-bold text-[#5B5DF6]">
                กลับไปเลือกประเภท
              </button>
              <p className="text-[13px] font-semibold text-[#64748B]">เลือก Facebook Page เป้าหมาย</p>
            </div>

            {pagesLoading ? (
              <div className="rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-6 text-center text-[13px] font-semibold text-[#64748B]">
                กำลังโหลด Facebook Pages...
              </div>
            ) : null}

            {pagesError ? (
              <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] font-semibold text-[#B91C1C]">
                {pagesError}
              </div>
            ) : null}

            {!pagesLoading && !pagesError ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => onConnect('Page', page)}
                    className="rounded-[10px] border border-[#D8DEE9] bg-white p-4 text-left transition hover:border-[#B9C5FF] hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1877F2] text-white">
                        <Flag className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-bold text-[#0F172A]">{page.name}</p>
                        <p className="mt-1 text-[12px] font-semibold text-[#64748B]">{page.category || 'Facebook Page'}</p>
                        <p className="mt-1 text-[11px] font-semibold text-[#94A3B8]">ID: {page.id}</p>
                      </div>
                    </div>
                  </button>
                ))}
                {!pages.length ? (
                  <div className="rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-6 text-center text-[13px] font-semibold text-[#64748B] sm:col-span-2">
                    ไม่พบ Facebook Page ที่เชื่อมต่อได้
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}

function PreviewPanel({
  selectedPlatformName,
  postCopy,
  media,
  selectedFacebookPage,
  onSelectPlatform,
}: {
  selectedPlatformName: PlatformName;
  postCopy: string;
  media: string[];
  selectedFacebookPage: FacebookPageTarget | null;
  onSelectPlatform: (platformName: PlatformName) => void;
}) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white shadow-[0_8px_26px_rgba(15,23,42,0.04)]">
      <div className="border-b border-[#E2E8F0] p-5 pb-0">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-[16px] font-bold text-[#0F172A]">ตัวอย่างการแสดงผล</h2>
          <button className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-[#D8DEE9] bg-white px-3.5 text-[12px] font-bold text-[#5B5DF6]">
            ดูทุกแพลตฟอร์ม
            <ChevronDown className="size-4" />
          </button>
        </div>
        <div className="flex min-w-0 items-center gap-8 overflow-x-auto">
          {platforms.map((platform) => {
            const selected = selectedPlatformName === platform.name;
            return (
              <button
                key={`tab-${platform.name}`}
                type="button"
                onClick={() => onSelectPlatform(platform.name)}
                className={cx(
                  'relative inline-flex h-12 shrink-0 items-center gap-2 border-b-3 px-2 text-[13px] font-semibold transition',
                  selected ? 'border-[#5B5DF6] text-[#4F46E5]' : 'border-transparent text-[#334155] hover:text-[#4F46E5]'
                )}
              >
                <img src={platform.logo.src} alt="" aria-hidden="true" className="size-4 shrink-0" />
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#FAFBFF] px-5 py-6">
        <div className="mx-auto max-w-[520px]">
          <SocialPreview selectedPlatformName={selectedPlatformName} postCopy={postCopy} media={media} selectedFacebookPage={selectedFacebookPage} />
        </div>
        <p className="mt-3 text-center text-[11px] font-medium text-[#94A3B8]">* ตัวอย่างอาจแตกต่างจากการแสดงผลจริงในแต่ละแพลตฟอร์ม</p>
      </div>
    </section>
  );
}

function SocialPreview({
  selectedPlatformName,
  postCopy,
  media,
  selectedFacebookPage,
}: {
  selectedPlatformName: PlatformName;
  postCopy: string;
  media: string[];
  selectedFacebookPage: FacebookPageTarget | null;
}) {
  const platform = getPlatform(selectedPlatformName);
  const mediaSpec = socialMediaPostSpecs[selectedPlatformName];
  const mediaSrc = media[0] ?? (mediaSpec.image === 'cover' ? vdoCover.src : previewGif.src);
  const isFacebook = selectedPlatformName === 'Facebook';
  const profileName = isFacebook && selectedFacebookPage ? selectedFacebookPage.name : 'PropPilot Real Estate';

  return (
    <article className="overflow-hidden rounded-[12px] border border-[#D8DEE9] bg-white shadow-[0_12px_36px_rgba(15,23,42,0.07)]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <img src={platform.logo.src} alt="" aria-hidden="true" className="size-10 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-[#0F172A]">{profileName}</p>
            <p className="inline-flex items-center gap-1 truncate text-[11px] font-semibold text-[#64748B]">
              Just now
              <span className="text-[#CBD5E1]">•</span>
              <Globe2 className="size-3" />
            </p>
          </div>
        </div>
        <MoreHorizontal className="size-5 text-[#64748B]" />
      </div>

      <div className="px-4 pb-3">
        <p className="whitespace-pre-line text-[13px] font-medium leading-6 text-[#0F172A]">{postCopy}</p>
      </div>

      <div className="overflow-hidden bg-[#111827]" style={{ aspectRatio: mediaSpec.aspectRatio }}>
        <img src={mediaSrc} alt={`${selectedPlatformName} ${mediaSpec.size}`} className="h-full w-full object-cover" />
      </div>

      {isFacebook ? (
        <div className="grid grid-cols-3 gap-1 border-t border-white bg-white">
          {(media.length ? media : [previewGif.src, vdoCover.src, previewGif.src]).slice(0, 3).map((image, index) => (
            <div key={`preview-strip-${image}-${index}`} className="relative aspect-[16/9] overflow-hidden bg-[#111827]">
              <img src={image} alt={`Preview thumbnail ${index + 1}`} className="h-full w-full object-cover" />
              {index === 2 ? <span className="absolute inset-0 grid place-items-center bg-black/35 text-[22px] font-bold text-white">+3</span> : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between border-b border-[#EEF2F7] px-4 py-3 text-[12px] font-medium text-[#64748B]">
        <span className="inline-flex items-center gap-1">
          <span className="grid size-4 place-items-center rounded-full bg-[#1877F2] text-white">
            <ThumbsUp className="size-2.5 fill-current" />
          </span>
          <span className="grid size-4 place-items-center rounded-full bg-[#EF4444] text-white">
            <Heart className="size-2.5 fill-current" />
          </span>
          128
        </span>
        <span>12 Comments&nbsp;&nbsp; 8 Shares</span>
      </div>

      <div className="grid grid-cols-3 px-3 py-2 text-[12px] font-semibold text-[#64748B]">
        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-[8px] hover:bg-[#F8FAFC]">
          <ThumbsUp className="size-4" />
          Like
        </button>
        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-[8px] hover:bg-[#F8FAFC]">
          <MessageSquare className="size-4" />
          Comment
        </button>
        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-[8px] hover:bg-[#F8FAFC]">
          <Share2 className="size-4" />
          Share
        </button>
      </div>
    </article>
  );
}

function SchedulePanel({
  schedule,
  publishStatus,
  onChange,
  onPublishNow,
}: {
  schedule: PlatformSchedule;
  publishStatus: PlatformPublishStatus;
  onChange: (schedule: Partial<PlatformSchedule>) => void;
  onPublishNow: () => void;
}) {
  const isScheduled = schedule.mode === 'scheduled';
  const isPosting = publishStatus.state === 'posting';

  return (
    <section className="rounded-[12px] border border-[#E2E8F0] bg-[#FBFCFF] p-4">
      <h3 className="mb-4 text-[15px] font-bold text-[#0F172A]">ตั้งเวลาการโพสต์</h3>
      <div className="grid gap-4 lg:grid-cols-[170px_minmax(0,1fr)] lg:items-start">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onChange({ mode: 'now' })}
            className="flex min-h-9 w-full items-center gap-3 rounded-[8px] px-1 text-left text-[13px] font-semibold text-[#334155] transition hover:bg-white"
          >
            <span className={cx('grid size-5 place-items-center rounded-full border', !isScheduled ? 'border-[#6C63FF] bg-[#6C63FF] text-white' : 'border-[#CBD5E1] bg-white text-transparent')}>
              <Check className="size-3.5" />
            </span>
            โพสต์เลย
          </button>
          <button
            type="button"
            onClick={() => onChange({ mode: 'scheduled' })}
            className="flex min-h-9 w-full items-center gap-3 rounded-[8px] px-1 text-left text-[13px] font-semibold text-[#334155] transition hover:bg-white"
          >
            <span className={cx('grid size-5 place-items-center rounded-full border', isScheduled ? 'border-[#6C63FF] bg-[#6C63FF] text-white' : 'border-[#CBD5E1] bg-white text-transparent')}>
              <Check className="size-3.5" />
            </span>
            กำหนดเวลา
          </button>
        </div>

        <div className="grid gap-3">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-bold text-[#334155]">โซนเวลา</span>
            <select
              value={schedule.timezone}
              onChange={(event) => onChange({ timezone: event.target.value })}
              className="h-10 w-full rounded-[8px] border border-[#D8DEE9] bg-white px-3 text-[13px] font-semibold text-[#334155] outline-none transition hover:border-[#B9C5FF] focus:border-[#8B7BFF] focus:ring-4 focus:ring-[#7B61FF]/10"
            >
              <option>(GMT+7) Bangkok</option>
              <option>(GMT+8) Singapore</option>
              <option>(GMT+0) UTC</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-bold text-[#334155]">วันที่</span>
              <div className="relative">
                <input
                  type="date"
                  value={schedule.date}
                  onChange={(event) => onChange({ date: event.target.value, mode: 'scheduled' })}
                  className="h-10 w-full rounded-[8px] border border-[#D8DEE9] bg-white px-3 pr-9 text-[13px] font-semibold text-[#334155] outline-none transition hover:border-[#B9C5FF] focus:border-[#8B7BFF] focus:ring-4 focus:ring-[#7B61FF]/10"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
              </div>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-bold text-[#334155]">เวลา</span>
              <div className="relative">
                <input
                  type="time"
                  value={schedule.time}
                  onChange={(event) => onChange({ time: event.target.value, mode: 'scheduled' })}
                  className="h-10 w-full rounded-[8px] border border-[#D8DEE9] bg-white px-3 pr-9 text-[13px] font-semibold text-[#334155] outline-none transition hover:border-[#B9C5FF] focus:border-[#8B7BFF] focus:ring-4 focus:ring-[#7B61FF]/10"
                />
                <Clock3 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_48px_minmax(150px,0.72fr)] sm:items-center">
        <button
          type="button"
          onClick={onPublishNow}
          disabled={isPosting}
          className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-gradient-to-r from-[#7B61FF] to-[#5B5DF6] px-5 text-[13px] font-bold text-white shadow-[0_14px_26px_rgba(91,80,230,0.20)] transition hover:brightness-105 active:scale-[0.99]"
        >
          <Send className="size-4" />
          {isPosting ? 'กำลังโพสต์...' : isScheduled ? 'ตั้งเวลาโพสต์' : 'โพสต์เลย'}
        </button>
        <button type="button" aria-label="More publish options" className="grid size-11 place-items-center rounded-[10px] bg-[#5B5DF6] text-white transition hover:brightness-105 active:scale-[0.99]">
          <ChevronDown className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => onChange({ draftSaved: !schedule.draftSaved })}
          className={cx(
            'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border px-3 text-[13px] font-semibold transition',
            schedule.draftSaved ? 'border-[#B9C5FF] bg-[#F3F1FF] text-[#5B5DF6]' : 'border-transparent text-[#64748B] hover:border-[#E2E8F0] hover:bg-white',
          )}
        >
          <Bookmark className="size-4 shrink-0" />
          <span className="truncate">{schedule.draftSaved ? 'บันทึกแล้ว' : 'บันทึกเป็นแบบร่าง'}</span>
        </button>
      </div>
      {publishStatus.message ? (
        <p
          className={cx(
            'mt-3 rounded-[8px] px-3 py-2 text-[12px] font-semibold',
            publishStatus.state === 'success' && 'bg-[#ECFDF3] text-[#15803D]',
            publishStatus.state === 'error' && 'bg-[#FEF2F2] text-[#B91C1C]',
            publishStatus.state === 'posting' && 'bg-[#EEF2FF] text-[#4F46E5]',
          )}
        >
          {publishStatus.message}
        </p>
      ) : null}
    </section>
  );
}

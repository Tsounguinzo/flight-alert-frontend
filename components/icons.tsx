import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const HeaderLogo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_18067_190)">
      <path
        d="M34.142 34.1428C29.2155 39.0693 22.3576 40.8881 16.0041 39.5999C15.4318 39.4832 14.8628 39.3419 14.3004 39.1754C11.2098 38.2595 8.29711 36.582 5.85797 34.1428C-1.95266 26.3322 -1.95266 13.6693 5.85797 5.85872C8.29719 3.4195 11.2106 1.74114 14.3013 0.826061C14.8637 0.658717 15.4327 0.517467 16.0057 0.401608C22.3584 -0.887377 29.2155 0.932233 34.142 5.85872C41.9527 13.6693 41.9527 26.3322 34.142 34.1428Z"
        fill="#214CE7"
      />
      <path
        d="M34.142 34.1427C29.2154 39.0693 22.3575 40.888 16.004 39.5998C15.7796 39.5541 15.555 39.5043 15.3313 39.4504C14.986 39.368 14.6416 39.2765 14.3003 39.1754C11.2097 38.2594 8.29705 36.5819 5.85791 34.1427L34.142 5.85864C34.3926 6.10927 34.6359 6.3656 34.8701 6.62599C41.9444 14.4774 41.702 26.5827 34.142 34.1427Z"
        fill="#214CE7"
      />
      <path
        d="M34.142 34.1427C29.2155 39.0693 22.3576 40.888 16.0041 39.5998C15.7796 39.5541 15.5551 39.5043 15.3314 39.4504L12.0995 36.2186L12 28.2676L34.8702 6.62598C41.9445 14.4774 41.702 26.5827 34.142 34.1427Z"
        fill="#214CE7"
      />
      <path
        d="M31.2246 36.4937L31.0336 36.6847C30.5462 37.0071 30.0442 37.3092 29.5282 37.5892L20.3103 20.3198L20.0923 19.9084L2.41152 10.4717L2.02051 10.2627L3.50707 8.77612L27.0311 12.9696L27.1258 13.5042L31.2246 36.4937Z"
        fill="#EEEEEE"
      />
      <path
        d="M31.2243 36.4936L31.0333 36.6846C30.5459 37.007 30.0439 37.3091 29.5279 37.5891L22.5525 24.5205L20.3101 20.3197L27.1256 13.5042L28.0995 18.9744L31.2243 36.4936Z"
        fill="#D2D2D3"
      />
      <path
        d="M28.0995 18.9742L22.553 24.5207L20.3101 20.32L27.1254 13.5046L28.0995 18.9742Z"
        fill="#C2C2C2"
      />
      <path
        d="M36.5922 3.44752C35.4288 2.28409 32.5161 3.31049 30.0867 5.74002C28.2849 7.54174 16.3106 18.8351 11.3539 25.6635C11.2003 25.8751 10.9554 26.0001 10.6938 26.0001H5.2584C5.16824 26.0001 5.08184 26.036 5.01809 26.0996L3.72512 27.3926C3.55855 27.5592 3.60777 27.8405 3.82105 27.9406L8.86918 30.3101C9.24754 30.4878 9.55199 30.7921 9.72957 31.1705L12.0991 36.2185C12.1992 36.4317 12.4805 36.481 12.6471 36.3145L13.94 35.0215C14.0038 34.9578 14.0396 34.8713 14.0396 34.7812V29.1635C14.0396 28.9043 14.1622 28.6614 14.3707 28.5074C21.18 23.4777 32.5069 11.7458 34.2998 9.95299C36.7293 7.52354 37.7557 4.61088 36.5922 3.44752Z"
        fill="#EEEEEE"
      />
    </g>
    <defs>
      <clipPath id="clip0_18067_190">
        <rect
          width="40"
          height="40"
          fill="white"
          transform="translate(0 0.000488281)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const FooterLogo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    {...props}
    width="51"
    height="51"
    viewBox="0 0 51 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_18057_3355)">
      <path
        d="M43.3021 43.5619C37.0538 49.8102 28.356 52.1169 20.2978 50.4831C19.572 50.335 18.8504 50.1559 18.1371 49.9448C14.2173 48.7831 10.5232 46.6555 7.42962 43.5619C-2.47654 33.6557 -2.47654 17.5956 7.42962 7.6894C10.5233 4.59576 14.2184 2.46711 18.1382 1.30652C18.8515 1.09428 19.5731 0.915136 20.2999 0.768193C28.3569 -0.866617 37.0538 1.44118 43.3021 7.6894C53.2082 17.5956 53.2082 33.6557 43.3021 43.5619Z"
        fill="white"
        fillOpacity="0.14"
      />
      <path
        d="M43.3022 43.5619C37.0538 49.8102 28.356 52.117 20.2979 50.4831C20.0132 50.4252 19.7285 50.3619 19.4448 50.2937C19.0068 50.1891 18.57 50.0731 18.1371 49.9448C14.2173 48.7831 10.5232 46.6556 7.42969 43.5619L43.3022 7.68945C43.62 8.00732 43.9286 8.33242 44.2256 8.66267C53.1979 18.6206 52.8904 33.9736 43.3022 43.5619Z"
        fill="white"
        fillOpacity="0.02"
      />
      <path
        d="M43.3023 43.5609C37.054 49.8092 28.3562 52.1159 20.298 50.4821C20.0134 50.4241 19.7286 50.3609 19.4449 50.2926L15.346 46.1938L15.2197 36.1096L44.2259 8.66162C53.1981 18.6195 52.8906 33.9726 43.3023 43.5609Z"
        fill="white"
        fillOpacity="0.1"
      />
      <path
        d="M39.6018 46.5436L39.3595 46.7859C38.7414 47.1948 38.1047 47.5779 37.4504 47.933L25.7593 26.0304L25.4828 25.5086L3.05842 13.5401L2.5625 13.275L4.4479 11.3896L34.2833 16.7082L34.4034 17.3863L39.6018 46.5436Z"
        fill="#EEEEEE"
      />
      <path
        d="M39.6017 46.5431L39.3594 46.7854C38.7413 47.1943 38.1046 47.5773 37.4503 47.9325L28.6033 31.3577L25.7593 26.0299L34.4034 17.3857L35.6386 24.3236L39.6017 46.5431Z"
        fill="#D2D2D3"
      />
      <path
        d="M35.6386 24.3238L28.604 31.3583L25.7593 26.0306L34.4032 17.3867L35.6386 24.3238Z"
        fill="#C2C2C2"
      />
      <path
        d="M46.4101 4.63159C44.9345 3.15601 41.2404 4.4578 38.1592 7.53915C35.874 9.82426 20.687 24.1475 14.4006 32.8079C14.2057 33.0763 13.895 33.2349 13.5633 33.2349H6.66964C6.5553 33.2349 6.44571 33.2803 6.36485 33.3611L4.72499 35.001C4.51374 35.2122 4.57617 35.569 4.84667 35.6959L11.2492 38.7012C11.729 38.9265 12.1152 39.3125 12.3404 39.7924L15.3457 46.1948C15.4726 46.4652 15.8294 46.5277 16.0406 46.3165L17.6805 44.6766C17.7614 44.5958 17.8067 44.4861 17.8067 44.3719V37.2469C17.8067 36.9183 17.9623 36.6101 18.2267 36.4148C26.8629 30.0357 41.2287 15.1562 43.5026 12.8824C46.5839 9.80117 47.8857 6.10707 46.4101 4.63159Z"
        fill="#EEEEEE"
      />
    </g>
    <defs>
      <clipPath id="clip0_18057_3355">
        <rect
          width="50.7317"
          height="50.7317"
          fill="white"
          transform="translate(0 0.259277)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const YoutubeIcon: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="0.259277"
      width="32"
      height="32"
      rx="16"
      fill="white"
      fillOpacity="0.06"
    />
    <rect
      x="0.5"
      y="0.759277"
      width="31"
      height="31"
      rx="15.5"
      stroke="white"
      strokeOpacity="0.04"
    />
    <path
      d="M20.8437 10.4398H11.1212C9.21283 10.4398 7.66699 11.969 7.66699 13.8556V18.6623C7.66699 20.549 9.21366 22.079 11.1212 22.079H20.8437C22.752 22.079 24.2978 20.549 24.2978 18.6623V13.8556C24.2978 11.969 22.7512 10.439 20.8437 10.439V10.4398ZM18.5078 16.4923L13.9603 18.6381C13.9326 18.6515 13.9019 18.6576 13.8712 18.6559C13.8404 18.6542 13.8106 18.6448 13.7845 18.6285C13.7584 18.6122 13.7368 18.5896 13.7218 18.5627C13.7068 18.5358 13.6988 18.5056 13.6987 18.4748V14.0506C13.6992 14.0197 13.7076 13.9894 13.723 13.9626C13.7384 13.9357 13.7604 13.9133 13.7868 13.8972C13.8133 13.8811 13.8434 13.872 13.8743 13.8707C13.9052 13.8695 13.936 13.876 13.9637 13.8898L18.512 16.169C18.5423 16.1841 18.5677 16.2074 18.5853 16.2363C18.603 16.2652 18.6121 16.2985 18.6116 16.3324C18.6112 16.3662 18.6012 16.3992 18.5829 16.4277C18.5645 16.4561 18.5385 16.4788 18.5078 16.4931V16.4923Z"
      fill="white"
    />
  </svg>
);

export const FacebookIcon: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="0.259277"
      width="32"
      height="32"
      rx="16"
      fill="white"
      fillOpacity="0.06"
    />
    <rect
      x="0.5"
      y="0.759277"
      width="31"
      height="31"
      rx="15.5"
      stroke="white"
      strokeOpacity="0.04"
    />
    <path
      d="M13.5387 11.1471V13.4371H11.8604V16.2371H13.5387V24.5588H16.9837V16.2379H19.2962C19.2962 16.2379 19.5129 14.8954 19.6179 13.4271H16.9979V11.5121C16.9979 11.2263 17.3729 10.8413 17.7445 10.8413H19.6229V7.92627H17.0695C13.4529 7.92627 13.5387 10.7288 13.5387 11.1471Z"
      fill="white"
    />
  </svg>
);

export const InstagramIcon: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="0.259277"
      width="32"
      height="32"
      rx="16"
      fill="white"
      fillOpacity="0.06"
    />
    <rect
      x="0.5"
      y="0.759277"
      width="31"
      height="31"
      rx="15.5"
      stroke="white"
      strokeOpacity="0.04"
    />
    <path
      d="M19.3478 7.92627H12.6228C11.3088 7.92781 10.049 8.45055 9.11993 9.3798C8.19084 10.309 7.66832 11.5689 7.66699 12.8829L7.66699 19.6079C7.66854 20.922 8.19128 22.1817 9.12052 23.1108C10.0498 24.0399 11.3096 24.5624 12.6237 24.5638H19.3487C20.6627 24.5622 21.9225 24.0395 22.8516 23.1102C23.7806 22.181 24.3032 20.9211 24.3045 19.6071V12.8821C24.3029 11.5681 23.7802 10.3083 22.851 9.37921C21.9217 8.45012 20.6619 7.92759 19.3478 7.92627V7.92627ZM22.6312 19.6071C22.6312 20.0383 22.5462 20.4652 22.3812 20.8636C22.2162 21.2619 21.9744 21.6239 21.6695 21.9288C21.3646 22.2337 21.0027 22.4755 20.6043 22.6405C20.206 22.8055 19.779 22.8904 19.3478 22.8904H12.6228C11.7522 22.8902 10.9173 22.5442 10.3017 21.9285C9.68613 21.3128 9.34033 20.4778 9.34033 19.6071V12.8821C9.34055 12.0115 9.68657 11.1765 10.3023 10.561C10.918 9.94541 11.753 9.5996 12.6237 9.5996H19.3487C20.2193 9.59982 21.0542 9.94584 21.6698 10.5616C22.2854 11.1773 22.6312 12.0123 22.6312 12.8829V19.6079V19.6071Z"
      fill="white"
    />
    <path
      d="M15.9848 11.9419C14.8443 11.9437 13.751 12.3975 12.9447 13.2041C12.1383 14.0106 11.6846 15.1039 11.6831 16.2444C11.6844 17.3852 12.1381 18.4788 12.9447 19.2856C13.7513 20.0923 14.8448 20.5462 15.9856 20.5477C17.1265 20.5464 18.2203 20.0926 19.0271 19.2858C19.8338 18.4791 20.2876 17.3853 20.2889 16.2444C20.2872 15.1036 19.8331 14.0101 19.0262 13.2037C18.2193 12.3973 17.1255 11.9438 15.9848 11.9427V11.9419ZM15.9848 18.8744C15.2875 18.8744 14.6187 18.5974 14.1257 18.1043C13.6326 17.6113 13.3556 16.9425 13.3556 16.2452C13.3556 15.5479 13.6326 14.8792 14.1257 14.3861C14.6187 13.8931 15.2875 13.6161 15.9848 13.6161C16.6821 13.6161 17.3508 13.8931 17.8439 14.3861C18.3369 14.8792 18.6139 15.5479 18.6139 16.2452C18.6139 16.9425 18.3369 17.6113 17.8439 18.1043C17.3508 18.5974 16.6821 18.8744 15.9848 18.8744Z"
      fill="white"
    />
    <path
      d="M20.2965 13.0055C20.8658 13.0055 21.3273 12.544 21.3273 11.9747C21.3273 11.4054 20.8658 10.9438 20.2965 10.9438C19.7271 10.9438 19.2656 11.4054 19.2656 11.9747C19.2656 12.544 19.7271 13.0055 20.2965 13.0055Z"
      fill="white"
    />
  </svg>
);

export const LinkedInIcon: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="0.259277"
      width="32"
      height="32"
      rx="16"
      fill="white"
      fillOpacity="0.06"
    />
    <rect
      x="0.5"
      y="0.759277"
      width="31"
      height="31"
      rx="15.5"
      stroke="white"
      strokeOpacity="0.04"
    />
    <path
      d="M24.299 17.6919V23.8411H20.734V18.1036C20.734 16.6619 20.2182 15.6786 18.9282 15.6786C17.9432 15.6786 17.3565 16.3419 17.099 16.9828C17.0048 17.2119 16.9807 17.5311 16.9807 17.8519V23.8411H13.414C13.414 23.8411 13.4623 14.1244 13.414 13.1169H16.9807V14.6369L16.9573 14.6719H16.9807V14.6369C17.454 13.9078 18.2998 12.8653 20.194 12.8653C22.5398 12.8653 24.299 14.3986 24.299 17.6919ZM9.684 7.94775C8.46484 7.94775 7.6665 8.74775 7.6665 9.80025C7.6665 10.8294 8.4415 11.6536 9.63734 11.6536H9.66067C10.9048 11.6536 11.6773 10.8294 11.6773 9.80025C11.6557 8.74775 10.9057 7.94775 9.68484 7.94775H9.684ZM7.87817 23.8411H11.4432V13.1169H7.87817V23.8411Z"
      fill="white"
    />
  </svg>
);

export const ArrowRightIcon: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    width="7"
    height="13"
    viewBox="0 0 7 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.939941 11.539L5.28661 7.19234C5.79994 6.679 5.79994 5.839 5.28661 5.32567L0.939941 0.979004"
      stroke="#EBEBEB"
      strokeOpacity="0.8"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
